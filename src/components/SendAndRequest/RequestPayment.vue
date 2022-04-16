<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <SearchPeoples :showButton="true"
            @contactClicked="(contact) => showCreateRequestPaymentModal(contact['user'])"
            @peopleClicked="showCreateRequestPaymentModal" />
        <RecentContacts @contactClicked="(contact) => showCreateRequestPaymentModal(contact['user'])"
            class="mt-5" />
        <CreatePaymentModal @nextClicked="handleMakeRequestPayment" :user="state.modal.createPaymentModal.user">
            <template #nextButtonText>Make a request</template>
        </CreatePaymentModal>
    </div>
</template>

<script setup>
import SearchPeoples from './SearchPeoples.vue';
import { defineComponent, reactive, onMounted } from "vue";
import { handleMakeRequestPayment } from "@/services/functions.js";
import CreatePaymentModal from "@/components/Bootstrap5/Modals/CreatePaymentModal.vue"
import RecentContacts from './RecentContacts.vue';
import Helpers from '../../Helpers';
import { useContactsStore } from '../../stores/ContactsStore';
const ContactsStore = useContactsStore();
defineComponent({ SearchPeoples, RecentContacts, CreatePaymentModal });
const state = reactive({
    modal: { createPaymentModal: { user: {} }, }
})
onMounted(() => {
    ContactsStore.fetch({
        order_by: "last_transaction:desc",
        favorited: 1,
        blocked: 0,
        added: 1,

        // parameters for handling pagination/paginator
        per_page: 5,
        page: 1,
    });
})

function showCreateRequestPaymentModal(user) {
    state.modal.createPaymentModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-create-payment`);
}
</script>

<style scoped>
</style>