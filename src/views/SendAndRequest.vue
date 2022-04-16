<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white">
                <SendPayment v-if="state.currentMenu == state.menus[0].name" />

                <RequestPayment v-if="state.currentMenu == state.menus[1].name" />

                <Contacts v-if="state.currentMenu == state.menus[2].name" />
            </div>
            <div class="col-md-4">
                <VerticalMenu :menus="state.menus" @menuClicked="changeMenu" />
            </div>
        </div>

        <Footer></Footer>
    </div>
    <!--  -->
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, onBeforeMount, reactive, onUpdated } from 'vue';
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import Footer from '../components/Layouts/Footer.vue';
import SendPayment from '../components/SendAndRequest/SendPayment.vue';
import RequestPayment from '../components/SendAndRequest/RequestPayment.vue';
import VerticalMenu from '../components/Layouts/VerticalMenu.vue';
import Contacts from "@/components/SendAndRequest/Contacts.vue";
const route = useRoute();
const state = reactive({
    currentMenu: "Send Payment",
    menus: [{
        name: "Send Payment", link: "/transfer/send"
    }, {
        name: "Request Payment", link: "/transfer/request"
    }, {
        name: "Contacts", link: "/transfer/contacts"
    }],
});
defineComponent({
    NavbarTop, SendPayment, RequestPayment, Contacts, VerticalMenu
});
onBeforeMount(() => {
    changeMenu(state.menus[0].name);
});
onMounted(() => {
    (state.menus).forEach(elem => elem.link.toLowerCase() == route.path.toLowerCase()
        ? state.currentMenu = elem.name : null);
    // keep the nav link active after click menus (components)
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
});
onUpdated(() => {
    // keep the nav link active after click menus (components )
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
});


function changeMenu(menu) {
    state.currentMenu = menu.name;
}
</script>