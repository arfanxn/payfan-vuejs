<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <FieldForSearchPeople />
    </div>
</template>

<script setup>
import FieldForSearchPeople from './FieldForSearchPeople.vue';
import { defineComponent } from "@vue/runtime-core";
defineComponent({ FieldForSearchPeople });
</script>

<style scoped>
</style>