<template>
    <div class="ms-4 p-5">
        <div class>
            <h5 class="text-dark mb-4">Contacts</h5>
            <FieldSearchPeople @peopleClicked="showPeoplePreview" @contactClicked="contactDetail" />
        </div>
        <div class>
            <small class="text-secondary d-block mt-2">Top contacts</small>
            <div class="top-contacts-lists-wrapper scrollbar-thin mt-2">
                <div
                    class="d-flex justify-content-between cursor-pointer my-4 px-3"
                    v-for="(contact, index) in ContactStore.topContacts"
                    :key="index"
                >
                    <a @click.prevent="contactDetail(contact)" class="d-flex text-dark w-100 me-2">
                        <div
                            class="contact-icon-size shadow rounded-circle d-flex overflow-hidden justify-content-center"
                            :style="`background-color : ${contact['user']['profile_pict']} !important; `"
                        >
                            <span
                                v-if="contact['user']['profile_pict'].includes('#')"
                                class="fw-bold my-auto text-white"
                            >{{ Helpers.getFirstCharEachWord(contact["user"]["name"]).join("").slice(0, 2) }}</span>
                            <img v-else :src="contact['user']['profile_pict']" alt />
                        </div>
                        <span class="ms-3 my-auto">{{ contact["user"]["name"] }}</span>
                    </a>

                    <div
                        @click="toggleFavoriteContact($event, contact)"
                        class="my-auto"
                        :class="`${contact['status'] == 'FAVORITED' ? 'text-success' : 'text-dark'}`"
                    >
                        <StarIcon width="24" height="24" />
                    </div>
                </div>

                <div class="bg-white d-flex px-4 py-3">
                    <span
                        v-if="ContactStore.topContacts.length"
                        class="my-auto lh-sm"
                    >Top contacts are limited to {{ ContactStore.topContacts.length }} only, use search instead of scrolling.</span>
                    <span v-else class="my-auto lh-sm">No Contacts yet.</span>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-5" v-if="ContactStore.topContacts.length">
                <router-link
                    to="/account/settings/privacy-and-notifications"
                    class="fw-bold text-navy hover-underline cursor-pointer text-center"
                >
                    <small>View blocked contacts</small>
                </router-link>
            </div>
        </div>
        <ContactDetailModal :contact="state.modal.contactDetail.contact" />
    </div>
</template>

<script setup>
import StarIcon from '@/components/Icons/StarIcon.vue';
import ContactDetailModal from '../Bootstrap5/Modals/ContactDetailModal.vue';
import { defineComponent } from '@vue/runtime-core';
import Helpers from '../../Helpers';
import ContactService from "@/services/ContactService.js";
import { useContactStore } from '../../stores/ContactStore';
import { useSearchPeopleStore } from '../../stores/SearchPeopleStore';
import FieldSearchPeople from './FieldSearchPeople.vue';
import { reactive } from 'vue';
import SwalPlugin from '../../plugins/SwalPlugin';
import { searchPeoplesOnPayfan } from '../../services/functions';
const ContactStore = useContactStore();
const SearchPeopleStore = useSearchPeopleStore();

defineComponent({ StarIcon, ContactDetailModal, FieldSearchPeople });
const state = reactive({
    modal: {
        contactDetail: {
            contact: {},
        }
    }
});

function showPeoplePreview(user) {
    SwalPlugin.confirm({
        title: `add "${user.name}" to contacts ?`,
        confirmButtonText: `Add`,
        icon: "question",
    }).then(result => {
        const onError = () => SwalPlugin.alert({ title: "Something went wrong!", icon: "error" });
        if (result.isConfirmed) {
            ContactService.addOrRm(user.id).then(r => {
                if (r.data.message.toLowerCase() == "added") {
                    SwalPlugin.autoCloseAlert(`"${user.name}" added to contacts`, null, "success", 1000)
                        ;
                    searchPeoplesOnPayfan(SearchPeopleStore.searchKeyword).then(r => {
                        if (r.status == 200) {
                            SearchPeopleStore.refillResults(r.data);
                        }
                    });
                } else {
                    onError()
                }
            })
        }
    })
}

function contactDetail(contact) {
    state.modal.contactDetail.contact = contact
    Helpers.triggerBSModal("#btn-modal-contact-detail");
}
function toggleFavoriteContact(event, contact) {
    ContactService.toggleFavorite(contact.id).then(r => {
        if (r.data.message == "FAVORITED") {
            SwalPlugin.alertPositioned({ title: `"${contact.user.name}" <strong>marked</strong> as top contacts` })
            if (event.target.classList.contains("text-dark")) { // if contains dark == not added to favorite
                event.target.classList.remove("text-dark");
                event.target.classList.add("text-success");
            }
        } else if (r.data.message == 'UNFAVORITED') {
            SwalPlugin.alertPositioned({ title: `"${contact.user.name}" <strong>removed</strong> from top contacts` })
            if (event.target.classList.contains("text-success")) {
                event.target.classList.remove("text-success");
                event.target.classList.add("text-dark");
            }

        }
    })
}
</script>

<style scoped>
.contact-icon-size {
    width: 65px;
    height: 65px;
}

.top-contacts-lists-wrapper {
    overflow: auto !important;
    max-height: 550px !important;
}
</style>