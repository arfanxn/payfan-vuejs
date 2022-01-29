<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white">
                <SendPaymentTo />
            </div>
            <div class="col-md-4">
                <div class="bg-white ms-4">
                    <ul class="text-end p-0">
                        <div class="py-3 px-3 border-bottom">
                            <a class="d-block text-decoration-none text-dark fw-bolder" href>Send</a>
                        </div>
                        <div class="py-3 px-3 border-bottom">
                            <a class="d-block text-decoration-none text-dark fw-bolder" href>Request</a>
                        </div>
                        <div class="py-3 px-3 border-bottom">
                            <a
                                class="d-block text-decoration-none text-dark fw-bolder"
                                href
                            >Contacts</a>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import SendPaymentTo from '../components/SendAndRequest/SendPaymentTo.vue';
import { defineComponent, onMounted } from 'vue';

defineComponent({
    NavbarTop, SendPaymentTo
})

onMounted(() => {
    document.body.style.height = "2000px";
})
</script>

<style scoped>
</style>