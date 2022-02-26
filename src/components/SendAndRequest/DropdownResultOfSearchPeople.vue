<template>
    <div
        v-show="props.show"
        class="wrapper-input-contact-option position-absolute overflow-auto scrollbar-thin mt-1 mx-0 shadow-lg bg-white w-100 rounded"
    >
        <div v-show="props.contacts.length >= 1">
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">Your contacts</span>
            </div>

            <router-link
                to="/"
                class="contact-lists d-block bg-white cursor-pointer px-4 py-3"
                v-for="(contact, index) in props.contacts"
                :key="index"
            >
                <div class="d-flex text-dark w-100 me-2">
                    <div
                        class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                    >
                        <span
                            class="fw-bold my-auto"
                        >{{ Helpers.getFirstCharEachWord(contact['user']['name']).join("").slice(0, 2) }}</span>
                    </div>
                    <small class="ms-3 fw-bold my-auto">{{ contact['user']['name'] }}</small>
                </div>
            </router-link>
        </div>

        <div>
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">People on {{ Helpers.ENV("APP_TITLE") }}</span>
            </div>

            <router-link
                to="/"
                class="contact-lists d-block bg-white cursor-pointer"
                v-for="(user, index) in props.users"
                :key="index"
            >
                <div v-if="!user['is_added_by_self']" class="d-flex px-4 py-3 text-dark w-100 me-2">
                    <div
                        class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                    >
                        <span
                            class="fw-bold my-auto"
                        >{{ Helpers.getFirstCharEachWord(user['name']).join("").slice(0, 2) }}</span>
                    </div>
                    <small class="ms-3 fw-bold my-auto">{{ user.name }}</small>
                </div>
        </router-link>

            <div class="bg-white d-flex px-4 py-3" v-if="props.users.length <= 0">
                <span
                    class="my-auto lh-sm"
                >Can't find the right person? Try entering their email or mobile number instead.</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import Helpers from '../../Helpers';
import { defineProps } from "vue";
const props = defineProps({
    show: Boolean,
    users: Array,
    contacts: Array
})
</script>

<style scoped>
.wrapper-input-contact-option {
    background-color: rgb(245, 251, 254) !important;
    max-height: 700px !important;
}
.contact-lists:hover {
    background-color: rgb(245, 251, 254) !important;
}
.contact-icon-size {
    width: 50px;
    height: 50px;
}
</style>