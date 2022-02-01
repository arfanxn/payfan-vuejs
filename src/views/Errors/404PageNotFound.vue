<template>
    <main class="d-flex justify-content-center">
        <div class="my-auto text-center bg-white p-5 rounded">
            <div class="mb-3">
                <a
                    href="/"
                    class="fs-1 text-navy rounded my-auto fw-bold"
                >{{ Helpers.ENV("APP_TITLE") }}</a>
            </div>
            <h2 class="mx-5 text-dark my-auto fw-bold mb-2">404 | Page Not Found</h2>

            <a href="/">
                <small class="text-navy hover-underline text-dark">Go to Dashboard</small>
            </a>
        </div>
    </main>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";

onMounted(() => {
    document.body.classList.add("bg-navy");
})
</script>

<style scoped>
main {
    min-height: 100vh;
}
</style>