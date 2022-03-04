<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Request Payment From</h5>
        <FieldSearchPeople />
    </div>
</template>

<script setup>
import FieldSearchPeople from './FieldSearchPeople.vue';
import { defineComponent } from "@vue/runtime-core";
defineComponent({ FieldSearchPeople });
</script>

<style scoped>
</style>