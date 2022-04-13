<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <SearchPeoples :showButton="true" @contactClicked="(contact) => showCreateRequestPaymentOrderModal(contact['user'])"
            @peopleClicked="showCreateRequestPaymentOrderModal" />
        <RecentContacts @contactClicked="(contact) => showCreateRequestPaymentOrderModal(contact['user'])" class="mt-5" />
        <CreateOrderModal @nextClicked="handleMakeRequestPayment" :user="state.modal.createOrderModal.user">
            <template #nextButtonText>Make a request</template>
        </CreateOrderModal>
    </div>
</template>

<script setup>
import SearchPeoples from './SearchPeoples.vue';
import { defineComponent, reactive, onMounted } from "vue";
import { handleMakeRequestPayment } from "@/services/functions.js";
import CreateOrderModal from "@/components/Bootstrap5/Modals/CreateOrderModal.vue"
import RecentContacts from './RecentContacts.vue';
import Helpers from '../../Helpers';
import { useContactsStore } from '../../stores/ContactsStore';
const ContactsStore = useContactsStore();
defineComponent({ SearchPeoples, RecentContacts, CreateOrderModal });
const state = reactive({
    modal: { createOrderModal: { user: {} }, }
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

function showCreateRequestPaymentOrderModal(user) {
    state.modal.createOrderModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-create-order`);
}
</script>

<style scoped>
</style>