<template>
    <div class="bg-white ms-4 text-end">
        <ul class=" p-0">
            <router-link v-for="(menu, index) in props.menus" :key="index" :to="menu.link || menu.url"
                @click.prevent="menuClicked(menu)"
                class="py-3 px-3 border-bottom cursor-pointer d-block text-decoration-none text-dark fw-bolder">{{
                    menu.name || menu.text || menu.title
                }}</router-link>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const emits = defineEmits(["menuClicked"]);
const props = defineProps({ menus: Array });


function menuClicked(menu) {
    emits("menuClicked", menu);
}
</script> 

<style scoped>
.router-link-active {
    color: rgb(0, 112, 186) !important;
    border-color: rgb(0, 112, 186) !important;
    border-bottom-width: 3px !important;
}
</style>