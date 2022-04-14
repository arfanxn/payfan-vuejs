<template>
    <main class="d-flex justify-content-center">
        <div class="my-auto text-center bg-white p-5 rounded shadow">
            <div class="mb-3">
                <router-link to="/" active-class="none" exact-active-class="none"
                    class="display-3 text-navy rounded my-auto fw-bold fst-italic">{{
                        Helpers.ENV("APP_TITLE")
                    }}
                </router-link>
            </div>
            <h2 class="mx-5 text-dark my-auto fw-bold mb-2">404 | Page Not Found</h2>

            <router-link to="/" active-class="none" exact-active-class="none">
                <small class="text-navy hover-underline text-dark">Go to Dashboard</small>
            </router-link>
        </div>
    </main>
</template>

<script setup>
import Helpers from "@/Helpers.js";
</script>

<style scoped>
main {
    min-height: 100vh;
}
</style>