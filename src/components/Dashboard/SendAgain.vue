<template>
    <div class="mb-5">
        <div class="d-flex justify-content-between mb-4">
            <router-link class="text-navy fw-bold fs-5 hover-underline" to="/transfer/send">Send Again</router-link>
            <div class="dropstart cursor-pointer">
                <img class="vertical-dots dropdown-toggle" src="@/assets/icons/three-vertical-dots-black.png"
                    data-bs-toggle="dropdown" aria-expanded="false" />
                <ul class="dropdown-menu shadow">
                    <router-link class="dropdown-item text-dark" to="/transfer/contacts">Manage contacts</router-link>
                    <router-link class="dropdown-item text-dark" to="/transfer/send">Send to others</router-link>
                </ul>
            </div>
        </div>

        <div class="row row-cols-md-3 row-cols-2 text-center">
            <div class="text-center mb-4" v-for="(contact) in ContactsStore['pagination/data'].slice(0, 5)"
                :key="contact.id">
                <div class="w-100 d-flex justify-content-center">
                    <UserAvatar :user="contact.user" style="width:50px; height:50px" />
                </div>
                <small class>{{ contact.user.name }}</small>
            </div>
            <router-link to="/transfer/contacts" class="text-center text-dark mb-4">
                <img class="contact-icon-size p-1" src="@/assets/icons/search.png" />
                <small class="d-block">Search</small>
            </router-link>
        </div>

    </div>
    <!--  -->
</template>

<script setup>
import { useContactsStore } from "../../stores/ContactsStore";
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
const ContactsStore = useContactsStore();



</script>


<style scoped>
.vertical-dots {
    width: 20px;
    height: 20px;
}

.contact-icon-size {
    width: 50px;
    height: 50px;
}
</style>