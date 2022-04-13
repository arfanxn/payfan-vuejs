<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white p-0">
                <keep-alive>
                    <AccountSettings v-if="state.currentMenu == state.menus[0].name" />
                </keep-alive>
                <keep-alive>
                    <SecuritySettings v-if="state.currentMenu == state.menus[1].name" />
                </keep-alive>
                <keep-alive>
                    <PrivacyAndNotifications v-if="state.currentMenu == state.menus[2].name" />
                </keep-alive>
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
import { defineComponent, reactive, onMounted } from 'vue';
import Footer from '../components/Layouts/Footer.vue';
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import VerticalMenu from '../components/Layouts/VerticalMenu.vue';
import AccountSettings from "@/components/Settings/AccountSettings.vue";
import SecuritySettings from "@/components/Settings/SecuritySettings.vue";
import PrivacyAndNotifications from '../components/Settings/PrivacyAndNotifications.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

defineComponent({
    NavbarTop, VerticalMenu, AccountSettings,
    SecuritySettings, PrivacyAndNotifications
});
const state = reactive({
    currentMenu: "Account",
    menus: [{
        name: "Account", link: "/account/settings"
    }, {
        name: "Security", link: "/account/settings/security"
    }, {
        name: "Privacy & Notifications", link: "/account/settings/privacy-and-notifications"
    }]
});

onMounted(() => {
    (state.menus).forEach(elem => elem.link.toLowerCase() == route.path.toLowerCase()
        ? state.currentMenu = elem.name : null);
});



function changeMenu(menu) {
    state.currentMenu = menu.name;
}
</script>
