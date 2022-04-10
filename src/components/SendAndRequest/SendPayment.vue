<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <SearchPeoples :showButton="true" @contactClicked="(contact) => sendPaymentPreview(contact['user'])"
            @peopleClicked="sendPaymentPreview" />
        <RecentContacts @contactClicked="(contact) => sendPaymentPreview(contact['user'])" class="mt-5" />
        <TransferPreviewModal @nextClicked="handleSendPayment" :user="state.modal.transferPreviewModal.user">
            <template #nextButtonText>Send Payment</template>
        </TransferPreviewModal>  </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted } from "vue";
import SearchPeoples from './SearchPeoples.vue';
import RecentContacts from './RecentContacts.vue';
import TransferPreviewModal from "@/components/Bootstrap5/Modals/TransferPreviewModal.vue"
import Helpers from '../../Helpers';
import { handleSendPayment } from "@/services/functions.js";
import { useContactsStore } from "../../stores/ContactsStore";
const ContactsStore = useContactsStore();
defineComponent({ SearchPeoples, RecentContacts, TransferPreviewModal });
const state = reactive({
    modal: { transferPreviewModal: { user: {} } }
})

onMounted(() => {
    ContactsStore.fetch({ per_page: 5 });
})

function sendPaymentPreview(user) {
    state.modal.transferPreviewModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-transfer-preview`);
}
</script>

<style scoped>
</style>