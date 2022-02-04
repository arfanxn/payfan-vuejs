<template>
    <div
        class="wrapper-input-contact-option position-absolute overflow-hidden mt-1 mx-0 shadow-lg bg-white w-100 rounded"
    >
        <div>
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">Your contacts</span>
            </div>

            <router-link
                to="/"
                class="contact-lists d-block bg-white cursor-pointer px-4 py-3"
                v-for="(item, index) in [1, 2]"
                :key="index"
            >
                <div class="d-flex text-dark w-100 me-2">
                    <div
                        class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                    >
                        <span class="fw-bold my-auto">AM</span>
                    </div>
                    <small class="ms-3 fw-bold my-auto">Alif Maulana</small>
                </div>
            </router-link>
        </div>

        <div>
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">People on {{ Helpers.ENV("APP_TITLE") }}</span>
            </div>

            <div class="bg-white d-flex px-4 py-3">
                <span
                    class="my-auto lh-sm"
                >Can't find the right person? Try entering their email or mobile number instead.</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import Helpers from '../../Helpers';
</script>

<style scoped>
.wrapper-input-contact-option {
    background-color: rgb(245, 251, 254) !important;
}
.contact-lists:hover {
    background-color: rgb(245, 251, 254) !important;
}
.contact-icon-size {
    width: 50px;
    height: 50px;
}
</style>