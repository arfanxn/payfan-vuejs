<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <SearchPeoples :showButton="true"
            @contactClicked="(contact) => showCreateSendPaymentOrderModal(contact['user'])"
            @peopleClicked="showCreateSendPaymentOrderModal" />
        <RecentContacts @contactClicked="(contact) => showCreateSendPaymentOrderModal(contact['user'])" class="mt-5" />
        <CreatePaymentModal @nextClicked="handleSendPayment" :user="state.modals.createPaymentModal.user">
            <template #nextButtonText>Send Payment</template>
        </CreatePaymentModal>
    </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted } from "vue";
import SearchPeoples from './SearchPeoples.vue';
import RecentContacts from './RecentContacts.vue';
import CreatePaymentModal from "@/components/Bootstrap5/Modals/CreatePaymentModal.vue"
import Helpers from '../../Helpers';
import { handleSendPayment } from "@/services/functions.js";
import { useContactsStore } from "../../stores/ContactsStore";
const ContactsStore = useContactsStore();
defineComponent({ SearchPeoples, RecentContacts, CreatePaymentModal });
const state = reactive({
    modals: { createPaymentModal: { user: {} } }
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

function showCreateSendPaymentOrderModal(user) {
    state.modals.createPaymentModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-create-payment`);
}
</script>

<style scoped>
</style>