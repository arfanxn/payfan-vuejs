<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <FieldSearchPeople @peopleClicked="test" />
    </div>
</template>

<script setup>
import FieldSearchPeople from './FieldSearchPeople.vue';
import { defineComponent } from "@vue/runtime-core";
defineComponent({ FieldSearchPeople });


</script>

<style scoped>
</style>