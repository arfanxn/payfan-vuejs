<template>
    <div class="ms-4 p-5">
        <div class>
            <h5 class="text-dark mb-4">Contacts</h5>
            <div class="form-floating mb-4">
                <input
                    type="email"
                    class="form-control"
                    id="inputSendTo"
                    placeholder="Name on your contacts or Email"
                />
                <label class="text-secondary" for="inputSendTo">Search</label>
            </div>
        </div>
        <div class>
            <small class="text-secondary">Top contacts</small>
            <div
                class="d-flex justify-content-between cursor-pointer my-4 px-3"
                v-for="(item, index) in [1, 2, 3, 4, 5]"
                :key="index"
            >
                <a @click.prevent="contactDetail(item)" class="d-flex text-dark w-100 me-2">
                    <div
                        class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                    >
                        <span class="fw-bold my-auto">AM</span>
                    </div>
                    <span class="ms-3 my-auto">Alif Maulana</span>
                </a>

                <div
                    @click="addOrRmFavoriteContact(index)"
                    :id="`top-contact-${index}`"
                    class="my-auto text-dark"
                >
                    <StarIcon width="24" height="24" />
                </div>
            </div>

            <div class="d-flex justify-content-center mt-5">
                <small
                    class="fw-bold text-navy hover-underline cursor-pointer text-center"
                >View blocked contacts</small>
            </div>
        </div>

        <ContactDetailModal />
    </div>
</template>

<script setup>
import StarIcon from '@/components/Icons/StarIcon.vue';
import ContactDetailModal from '../Bootstrap5/Modals/ContactDetailModal.vue';
import { defineComponent } from '@vue/runtime-core';
import Helpers from '../../Helpers';
defineComponent({ StarIcon, ContactDetailModal })



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
</style>