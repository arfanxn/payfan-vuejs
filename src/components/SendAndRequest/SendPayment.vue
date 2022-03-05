<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <FieldSearchPeople :showButton="true" @peopleClicked="test" />
        <RecentContacts class="mt-5" />
    </div>
</template>

<script setup>
import FieldSearchPeople from './FieldSearchPeople.vue';
import { defineComponent } from "@vue/runtime-core";
import RecentContacts from './RecentContacts.vue';
defineComponent({ FieldSearchPeople, RecentContacts });


</script>

<style scoped>
</style>