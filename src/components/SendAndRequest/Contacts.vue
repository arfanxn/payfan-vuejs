<template>
    <div class="ms-4 p-5">
        <div class>
            <h5 class="text-dark mb-4">Contacts</h5>
            <FieldForSearchPeople showButton="false" />
        </div>
        <div class>
            <small class="text-secondary">Top contacts</small>
            <div class="top-contacts-lists-wrapper scrollbar-thin mt-2">
                <div
                    class="d-flex justify-content-between cursor-pointer my-4 px-3"
                    v-for="(contact, index) in ContactStore.allAndNotBlocked"
                    :key="index"
                >
                    <a @click.prevent="contactDetail(contact)" class="d-flex text-dark w-100 me-2">
                        <div
                            class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                        >
                            <span
                                class="fw-bold my-auto"
                            >{{ Helpers.getFirstCharEachWord(contact["user"]["name"]).join("").slice(0, 2) }}</span>
                        </div>
                        <span class="ms-3 my-auto">{{ contact["user"]["name"] }}</span>
                    </a>

                    <div
                        @click="addOrRmFavoriteContact(index)"
                        :id="`top-contact-${index}`"
                        class="my-auto text-dark"
                    >
                        <StarIcon width="24" height="24" />
                    </div>
                </div>

                <div class="bg-white d-flex px-4 py-3">
                    <span
                        v-if="ContactStore.allAndNotBlocked.length"
                        class="my-auto lh-sm"
                    >Top contacts are limited to 50 only, use search instead of scrolling.</span>
                    <span v-else class="my-auto lh-sm">No Contacts yet.</span>
                </div>
            </div>

            <div
                class="d-flex justify-content-center mt-5"
                v-if="ContactStore.allAndNotBlocked.length"
            >
                <router-link
                    to="/account/settings/privacy-and-notifications"
                    class="fw-bold text-navy hover-underline cursor-pointer text-center"
                >
                    <small>View blocked contacts</small>
                </router-link>
            </div>
        </div>

        <ContactDetailModal />
    </div>
</template>

<script setup>
import StarIcon from '@/components/Icons/StarIcon.vue';
import ContactDetailModal from '../Bootstrap5/Modals/ContactDetailModal.vue';
import { defineComponent, onMounted } from '@vue/runtime-core';
import Helpers from '../../Helpers';
import ContactService from "@/services/ContactService.js";
import { useContactStore } from '../../stores/ContactsStore';
import FieldForSearchPeople from './FieldForSearchPeople.vue';
const ContactStore = useContactStore();
defineComponent({ StarIcon, ContactDetailModal, FieldForSearchPeople });


onMounted(() => {
    ContactService.whereNotBlocked().then(r => {
        ContactStore.allAndNotBlocked = r.data['contacts']["data"];
        console.log(ContactStore.allAndNotBlocked);
    });
})



function contactDetail(data) {
    Helpers.triggerBSModal("#btn-modal-contact-detail");
    console.log(data);
}
function addOrRmFavoriteContact(id) {
    const elem = document.getElementById(`top-contact-${id}`);
    if (elem.classList.contains("text-dark")) {
        elem.classList.remove("text-dark");
        elem.classList.add("text-success");
    } else {
        elem.classList.remove("text-success");
        elem.classList.add("text-dark");
    }
}
</script>

<style scoped>
.contact-icon-size {
    width: 65px;
    height: 65px;
}

.top-contacts-lists-wrapper {
    overflow: auto !important;
    max-height: 700px;
}
</style>