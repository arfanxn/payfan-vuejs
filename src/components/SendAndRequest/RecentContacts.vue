<template>
    <div class>
        <div class="d-flex justify-content-center">
            <div v-for="(contact, index ) in ContactsStore.top.slice(0, 3)" :key="index">
                <div
                    class="cursor-pointer d-flex flex-column text-center mx-4"
                    @click="onContactClicked(contact)"
                >
                    <div
                        class="contact-icon-size shadow rounded-circle mx-auto d-flex justify-content-center overflow-hidden"
                        :style="`background-color : ${contact?.user?.profile_pict}!important ;`"
                    >
                        <span
                            v-if="contact?.user?.profile_pict?.includes('#')"
                            class="fw-bold my-auto text-white"
                        >
                            {{
                                contact?.user?.name?.toUpperCase().slice(0, 2)
                            }}
                        </span>
                        <img v-else :src="contact?.user?.profile_pict" />
                    </div>

                    <p>{{ contact?.user?.name?.substring(0, 15) + "..." }}</p>
                </div>
            </div>
        </div>
        <div class="text-center mt-3">
            <a href="/transfer/contacts" class="fw-bold text-navy hover-underline">Manage Contacts</a>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useContactsStore } from '../../stores/ContactsStore';
const emits = defineEmits(["contactClicked"]);
const ContactsStore = useContactsStore();

function onContactClicked(contact) {
    emits("contactClicked", contact);
}
</script>

<style scoped>
.contact-icon-size {
    height: 60px;
    width: 60px;
}
</style>