<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white">
                <SendPayment v-if="state.currentMenu == state.rightSideMenu[0].name" />

                <RequestPayment v-if="state.currentMenu == state.rightSideMenu[1].name" />

                <Contacts v-if="state.currentMenu == state.rightSideMenu[2].name" />
            </div>
            <div class="col-md-4">
                <RightSideMenu :menus="state.rightSideMenu" @menuClicked="changeMenu" />
            </div>
        </div>  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, onBeforeMount, reactive, onUpdated } from 'vue';
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import SendPayment from '../components/SendAndRequest/SendPayment.vue';
import RequestPayment from '../components/SendAndRequest/RequestPayment.vue';
import RightSideMenu from '../components/Layouts/RightSideMenu.vue';
import Contacts from "@/components/SendAndRequest/Contacts.vue";
const route = useRoute();
const state = reactive({
    currentMenu: "Send Money",
    rightSideMenu: [{
        name: "Send Money", link: "/transfer/send"
    }, {
        name: "Request Money", link: "/transfer/request"
    }, {
        name: "Contacts", link: "/transfer/contacts"
    }],
});
defineComponent({
    NavbarTop, SendPayment, RequestPayment, Contacts, RightSideMenu
});
onBeforeMount(() => {
    changeMenu(state.rightSideMenu[0].name);
});
onMounted(() => {
    (state.rightSideMenu).forEach(elem => elem.link.toLowerCase() == route.path.toLowerCase()
        ? state.currentMenu = elem.name : null);
    // keep the nav link active after click menus (components)
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
    document.body.style.height = "1000px";
});
onUpdated(() => {
    // keep the nav link active after click menus (components )
    document.getElementById("NavLinkSendandRequest").classList.add("router-link-active")
});


function changeMenu(menu) {
    state.currentMenu = menu.name;
}
</script>