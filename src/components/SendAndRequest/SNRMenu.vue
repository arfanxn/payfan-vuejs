<template>
    <div class="bg-white ms-4">
        <ul class="text-end p-0">
            <router-link
                to="/transfer/send"
                @click="changeMenu(`send`)"
                class="py-3 px-3 border-bottom cursor-pointer d-block text-decoration-none text-dark fw-bolder"
            >Send</router-link>
            <router-link
                to="/transfer/request"
                @click="changeMenu(`request`)"
                class="py-3 px-3 border-bottom cursor-pointer d-block text-decoration-none text-dark fw-bolder"
            >Request</router-link>
            <router-link
                to="/transfer/contacts"
                @click="changeMenu(`contacts`)"
                class="py-3 px-3 border-bottom cursor-pointer d-block text-decoration-none text-dark fw-bolder"
            >Contacts</router-link>
        </ul>
    </div>
</template>

<script setup>
    
</script>