<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <SearchPeoples :showButton="true" @contactClicked="(contact) => showCreateSendPaymentOrderModal(contact['user'])"
            @peopleClicked="showCreateSendPaymentOrderModal" />
        <RecentContacts @contactClicked="(contact) => showCreateSendPaymentOrderModal(contact['user'])" class="mt-5" />
        <CreateOrderModal @nextClicked="handleSendPayment" :user="state.modals.createOrderModal.user">
            <template #nextButtonText>Send Payment</template>
        </CreateOrderModal>
    </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted } from "vue";
import SearchPeoples from './SearchPeoples.vue';
import RecentContacts from './RecentContacts.vue';
import CreateOrderModal from "@/components/Bootstrap5/Modals/CreateOrderModal.vue"
import Helpers from '../../Helpers';
import { handleSendPayment } from "@/services/functions.js";
import { useContactsStore } from "../../stores/ContactsStore";
const ContactsStore = useContactsStore();
defineComponent({ SearchPeoples, RecentContacts, CreateOrderModal });
const state = reactive({
    modals: { createOrderModal: { user: {} } }
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
    state.modals.createOrderModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-create-order`);
}
</script>

<style scoped>
</style>