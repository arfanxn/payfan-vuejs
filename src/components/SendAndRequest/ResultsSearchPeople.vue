<template>
    <div v-show="SearchPeoplesStore[`results/toggleShow`]"
        class="wrapper-input-contact-option position-absolute overflow-auto scrollbar-thin mt-1 mx-0 shadow-lg bg-white w-100 rounded">
        <div v-show="SearchPeoplesStore['results/contacts'].length > 0">
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">Your contacts</span>
            </div>

            <div class="contact-lists d-block bg-white cursor-pointer"
                v-for="(contact, index) in SearchPeoplesStore[`results/contacts`]" :key="index">
                <div v-if="contact['status'].toUpperCase() != `BLOCKED`" @click="onContactClicked(contact)"
                    class="d-flex text-dark w-100 me-2 px-4 py-3">
                    <UserAvatar :user="contact.user" style="width:50px;  height:50px" />
                    <div class="ms-3">
                        <small class="fw-bold d-block">{{ contact['user']['name'] }}</small>
                        <small class="fw-light">{{
                            contact["user"]["email"].includes(SearchPeoplesStore['searchKeyword']) ?
                                contact["user"]["email"] : StrHelper.make(contact["user"]["email"]).censor().get()
                        }}</small>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="fw-bold d-flex px-4 py-3">
                <span class="my-auto">People on {{ Helpers.ENV("APP_TITLE") }}</span>
            </div>

            <div class="contact-lists d-block bg-white cursor-pointer"
                v-for="(user, index) in SearchPeoplesStore['results/users']" :key="index">
                <div v-if="SearchPeoplesStore?.userIDsInContacts?.indexOf(user['id']) < 0"
                    @click="onPeopleClicked(user)" class="d-flex px-4 py-3 text-dark w-100 me-2">
                    <UserAvatar :user="user" style="width:50px;  height:50px" />
                    <div class="ms-3">
                        <small class="fw-bold d-block">{{ user['name'] }}</small>
                        <small class="fw-light">{{
                            user["email"].includes(SearchPeoplesStore.searchKeyword) ?
                                user["email"] : StrHelper.make(user["email"]).censor().get()
                        }}</small>
                    </div>
                </div>
            </div>

            <div class="bg-white d-flex px-4 py-3" v-if="SearchPeoplesStore['results/users']">
                <span class="my-auto lh-sm">Can't find the right person? Try entering their email or mobile number
                    instead.</span>
            </div>
        </div>
        <!--  -->
    </div>

    <!--  -->
</template>

<script setup>
import Helpers from '../../Helpers';
import StrHelper from '../../helpers/StrHelper';
import { defineEmits, defineComponent } from "vue";
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
import { useSearchPeoplesStore } from '../../stores/SearchPeoplesStore';
const SearchPeoplesStore = useSearchPeoplesStore();
const emits = defineEmits(["contactClicked", "peopleClicked"]);
defineComponent({ UserAvatar });

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
</style>