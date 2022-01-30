<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white">
                <SendPaymentTo v-if="state.currentMenu == `send`" />
                <RequestPaymentFrom v-if="state.currentMenu == `request`" />
                <Contacts v-if="state.currentMenu == `contacts`" />
            </div>
            <div class="col-md-4">
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
            </div>
        </div>
    </div>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import SendPaymentTo from '../components/SendAndRequest/SendPaymentTo.vue';
import RequestPaymentFrom from '../components/SendAndRequest/RequestPaymentFrom.vue';
import Contacts from "@/components/SendAndRequest/Contacts.vue";
import router from '../router';
import { defineComponent, onMounted, onBeforeMount, reactive, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const state = reactive({
    currentMenu: "send"
});
defineComponent({
    NavbarTop, SendPaymentTo, RequestPaymentFrom, Contacts
});
onBeforeMount(() => {
    changeMenu(route.params.menu);
});
onMounted(() => {
    // keep the nav link active after click menus (components )
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
    document.body.style.height = "2000px";
});
onUpdated(() => {
    // keep the nav link active after click menus (components )
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
});


function changeMenu(menu) {
    state.currentMenu = menu;
    const menus = ["send", "request", "contacts"];
    switch (menu) {
        case menus[1]:
            state.currentMenu = menus[1];
            router.replace({
                ...router.currentRoute,
                params: {
                    menu: menus[1]
                }
            })
            break;
        case menus[2]:
            state.currentMenu = menus[2];
            router.replace({
                ...router.currentRoute,
                params: {
                    menu: menus[2]
                }
            })
            break;
        default:
            state.currentMenu = menus[0];
            router.replace({
                ...router.currentRoute,
                params: {
                    menu: menus[0]
                }
            })
    }
}
</script>

<style scoped>
.router-link-active {
    color: rgb(0, 112, 186) !important;
    border-color: rgb(0, 112, 186) !important;
    border-bottom-width: 3px !important;
}
</style>