<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <SearchPeoples
            :showButton="true"
            @contactClicked="(contact) => requestPaymentPreview(contact['user'])"
            @peopleClicked="requestPaymentPreview"
        />
        <RecentContacts
            @contactClicked="(contact) => requestPaymentPreview(contact['user'])"
            class="mt-5"
        />
        <TransferPreviewModal
            @nextClicked="handleMakeRequestPayment"
            :user="state.modal.transferPreviewModal.user"
        >
            <template #nextButtonText>Make a request</template>
        </TransferPreviewModal>
    </div>
</template>

<script setup>
import SearchPeoples from './SearchPeoples.vue';
import { defineComponent, reactive } from "vue";
import { handleMakeRequestPayment } from "@/services/functions.js";
import TransferPreviewModal from "@/components/Bootstrap5/Modals/TransferPreviewModal.vue"
import RecentContacts from './RecentContacts.vue';
import Helpers from '../../Helpers';
defineComponent({ SearchPeoples, RecentContacts, TransferPreviewModal });
const state = reactive({
    modal: { transferPreviewModal: { user: {} }, }
})

function requestPaymentPreview(user) {
    state.modal.transferPreviewModal.user = user;
    Helpers.triggerBSModal(`#btn-modal-transfer-preview`);
}
</script>

<style scoped>
</style>