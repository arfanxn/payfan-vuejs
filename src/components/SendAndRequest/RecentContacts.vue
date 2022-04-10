<template>
    <div class>
        <div class="d-flex justify-content-center">
            <div v-for="(contact, index ) in ContactsStore['pagination/data'].slice(0, 3)" :key="index">
                <div class="cursor-pointer d-flex flex-column text-center mx-4" @click="onContactClicked(contact)">
                    <div class="w-100 d-flex  justify-content-center mb-1">
                        <UserAvatar :user="contact?.user" style="width:60px; height:60px" />
                    </div>

                    <p>{{ contact?.user?.name?.substring(0, 15) + "..." }}</p>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <a href="/transfer/contacts" class="fw-bold text-navy hover-underline">Manage Contacts</a>
        </div>

    </div>
    <!--  -->
</template>

<script setup>
import { defineEmits } from "vue";
import { useContactsStore } from '../../stores/ContactsStore';
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
const emits = defineEmits(["contactClicked"]);
const ContactsStore = useContactsStore();

function onContactClicked(contact) {
    emits("contactClicked", contact);
}
</script>

