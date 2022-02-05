<template>
    <div class="ms-4 p-5">
        <h5 class="text-dark mb-4">Send Payment To</h5>
        <div class="form-floating mb-4">
            <input
                type="email"
                class="form-control"
                id="inputSendTo"
                placeholder="Name on your contacts or Email"
            />
            <label class="text-secondary" for="inputSendTo">Name on your contacts or Email</label>
            <!-- <DropdownInputContactOption /> -->
        </div>
        <button class="btn btn-light border-dark rounded-pill py-2 px-4">Next</button>
    </div>
</template>

<script setup>
import DropdownInputContactOption from "@/components/SendAndRequest/DropdownInputContactOption.vue";
import { defineComponent } from "@vue/runtime-core";
defineComponent({ DropdownInputContactOption }); 
</script>

<style scoped>
</style>