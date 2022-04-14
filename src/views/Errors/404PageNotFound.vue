<template>
    <main class="d-flex justify-content-center">
        <div class="my-auto text-center bg-white p-5 rounded shadow-lg border border-4 border-navy">
            <div class="">
                <router-link to="/" active-class="none" exact-active-class="none"
                    class="display-2 text-navy rounded my-auto fw-bold fst-italic">{{
                        Helpers.ENV("APP_TITLE")
                    }}
                </router-link>
            </div>
            <div class="mt-3">
                <!-- <h1 class="mx-5 text-dark my-auto fw-light">404 | Page Not Found</h1> -->
                <h1 class="mx-5 text-dark my-auto fw-bold">404 | Page Not Found</h1>
            </div>

            <div class="d-flex justify-content-center mt-3">
                <router-link to="/" active-class="none" exact-active-class="none">
                    <h6 class="text-navy hover-underline text-dark me-3 fs-6">Go to Dashboard</h6>
                </router-link>
                <router-link to="/help" active-class="none" exact-active-class="none">
                    <h6 class="text-navy hover-underline text-dark ms-3 fs-6">Help Center</h6>
                </router-link>
            </div>
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