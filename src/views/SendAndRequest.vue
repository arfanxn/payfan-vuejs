<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white">
                <keep-alive>
                    <SendPaymentTo v-if="state.currentMenu == state.rightSideMenu[0].name" />
                </keep-alive>
                <keep-alive>
                    <RequestPaymentFrom v-if="state.currentMenu == state.rightSideMenu[1].name" />
                </keep-alive>
                <keep-alive>
                    <Contacts v-if="state.currentMenu == state.rightSideMenu[2].name" />
                </keep-alive>
            </div>
            <div class="col-md-4">
                <RightSideMenu :menus="state.rightSideMenu" @menuClicked="changeMenu" />
            </div>
        </div>
    </div>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import SendPaymentTo from '../components/SendAndRequest/SendPaymentTo.vue';
import RequestPaymentFrom from '../components/SendAndRequest/RequestPaymentFrom.vue';
import RightSideMenu from '../components/RightSideMenu.vue';
import Contacts from "@/components/SendAndRequest/Contacts.vue";
import { useRoute } from 'vue-router';
import { defineComponent, onMounted, onBeforeMount, reactive, onUpdated } from 'vue';
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
    NavbarTop, SendPaymentTo, RequestPaymentFrom, Contacts, RightSideMenu
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