<template>
    <main class="d-flex justify-content-center">
        <div class="my-auto text-center bg-white p-5 rounded">
            <div class="mb-3">
                <router-link
                    to="/"
                    active-class="none"
                    exact-active-class="none"
                    class="fs-1 text-navy rounded my-auto fw-bold"
                >{{ Helpers.ENV("APP_TITLE") }}</router-link>
            </div>
            <h2 class="mx-5 text-dark my-auto fw-bold mb-2">404 | Page Not Found</h2>

            <router-link to="/" active-class="none" exact-active-class="none">
                <small class="text-navy hover-underline text-dark">Go to Dashboard</small>
            </router-link>
        </div>
    </main>
</template>

<script setup>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import Helpers from "@/Helpers.js";

onMounted(() => {
    document.body.classList.add("bg-navy");
})
onUnmounted(() => {
    document.body.classList.remove("bg-navy");
}); 
</script>

<style scoped>
main {
    min-height: 100vh;
}
</style>