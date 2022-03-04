<template>
    <div
        v-show="props.show"
        class="wrapper-input-contact-option position-absolute overflow-auto scrollbar-thin mt-1 mx-0 shadow-lg bg-white w-100 rounded"
    >
        <div v-show="props.contacts.length >= 1">
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">Your contacts</span>
            </div>

            <div
                class="contact-lists d-block bg-white cursor-pointer"
                v-for="(contact, index) in props.contacts"
                :key="index"
            >
                <div
                    v-if="contact['status'].toUpperCase() != `BLOCKED`"
                    @click="onContactClicked(contact)"
                    class="d-flex text-dark w-100 me-2 px-4 py-3"
                >
                    <div
                        class="contact-icon-size shadow rounded-circle d-flex justify-content-center overflow-hidden"
                        :style="`background-color : ${contact['user']['profile_pict']} !important; `"
                    >
                        <span
                            v-if="contact['user']['profile_pict'].includes(`#`)"
                            class="fw-bold my-auto text-white"
                        >{{ Helpers.getFirstCharEachWord(contact['user']['name']).join("").slice(0, 2) }}</span>
                        <img v-else :src="contact['user']['profile_pict']" />
                    </div>
                    <div class="ms-3">
                        <small class="fw-bold d-block">{{ contact['user']['name'] }}</small>
                        <small
                            class="fw-light"
                        >{{ contact["user"]["email"].includes(props.keyword) ? contact["user"]["email"] : Helpers.strCensor(contact["user"]["email"]) }}</small>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">People on {{ Helpers.ENV("APP_TITLE") }}</span>
            </div>

            <div
                class="contact-lists d-block bg-white cursor-pointer"
                v-for="(user, index) in props.users"
                :key="index"
            >
                <div
                    v-if="!user['is_added_by_self']"
                    @click="onPeopleClicked(user)"
                    class="d-flex px-4 py-3 text-dark w-100 me-2"
                >
                    <div
                        class="contact-icon-size shadow rounded-circle d-flex justify-content-center overflow-hidden"
                        :style="`background-color : ${user['profile_pict']} !important; `"
                    >
                        <span
                            v-if="user['profile_pict'].includes(`#`)"
                            class="fw-bold my-auto text-white"
                        >{{ Helpers.getFirstCharEachWord(user['name']).join("").slice(0, 2) }}</span>
                        <img v-else :src="user['profile_pict']" />
                    </div>
                    <div class="ms-3">
                        <small class="fw-bold d-block">{{ user['name'] }}</small>
                        <small
                            class="fw-light"
                        >{{ user["email"].includes(props.keyword) ? user["email"] : Helpers.strCensor(user["email"]) }}</small>
                    </div>
                </div>
            </div>

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
import { defineProps, defineEmits } from "vue";
const emits = defineEmits(["contactClicked", "peopleClicked"]);
const props = defineProps({
    keyword: String,
    show: Boolean,
    users: Array,
    contacts: Array
})


function onContactClicked(contact) {
    emits("contactClicked", contact);
}
function onPeopleClicked(user) {
    emits("peopleClicked", user);
}
</script>

<style scoped>
.wrapper-input-contact-option {
    background-color: rgb(245, 251, 254) !important;
    max-height: 400px !important;
}
.contact-lists:hover {
    background-color: rgb(245, 251, 254) !important;
}
.contact-icon-size {
    width: 50px;
    height: 50px;
}
</style>