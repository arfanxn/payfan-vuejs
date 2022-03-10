<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <FieldSearchPeople
            :showButton="true"
            @contactClicked="(contact) => sendPaymentPreview(contact['user'])"
            @peopleClicked="sendPaymentPreview"
        />
        <RecentContacts
            @contactClicked="(contact) => sendPaymentPreview(contact['user'])"
            class="mt-5"
        />
        <TransferPreviewModal
            @nextClicked="handleSendPayment"
            :user="state.modal.transferPreviewModal.user"
        >
            <template #nextButtonText>Send Payment</template>
        </TransferPreviewModal>
    </div>
</template>

<script setup>
import FieldSearchPeople from './FieldSearchPeople.vue';
import { defineComponent, reactive } from "@vue/runtime-core";
import RecentContacts from './RecentContacts.vue';
import TransferPreviewModal from "@/components/Bootstrap5/Modals/TransferPreviewModal.vue"
import Helpers from '../../Helpers';
import { handleSendPayment } from "@/services/functions.js";
defineComponent({ FieldSearchPeople, RecentContacts, TransferPreviewModal });
const state = reactive({
    modal: { transferPreviewModal: { user: {} } }
})

function sendPaymentPreview(user) {
    state.modal.transferPreviewModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-transfer-preview`);
}
</script>

<style scoped>
</style>