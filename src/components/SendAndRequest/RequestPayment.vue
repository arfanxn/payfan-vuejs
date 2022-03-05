<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <FieldSearchPeople :showButton="true" />
        <RecentContacts @contactClicked="requestPaymentPreview" class="mt-5" />
    </div>
</template>

<script setup>
import FieldSearchPeople from './FieldSearchPeople.vue';
import { defineComponent } from "@vue/runtime-core";
import RecentContacts from './RecentContacts.vue';
defineComponent({ FieldSearchPeople, RecentContacts });

function requestPaymentPreview(contact) {
    contact;
}
</script>

<style scoped>
</style>