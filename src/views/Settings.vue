<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white p-0">
                <keep-alive>
                    <AccountSettings v-if="state.currentMenu == state.rightSideMenu[0].name" />
                </keep-alive>
                <keep-alive>
                    <SecuritySettings v-if="state.currentMenu == state.rightSideMenu[1].name" />
                </keep-alive>
                <keep-alive>
                    <PrivacyAndNotifications
                        v-if="state.currentMenu == state.rightSideMenu[2].name"
                    />
                </keep-alive>
            </div>
            <div class="col-md-4">
                <RightSideMenu :menus="state.rightSideMenu" @menuClicked="changeMenu" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, reactive, onMounted } from 'vue';
import NavbarTop from '../components/NavbarTop.vue';
import RightSideMenu from '../components/RightSideMenu.vue';
import AccountSettings from "@/components/Settings/AccountSettings.vue";
import SecuritySettings from "@/components/Settings/SecuritySettings.vue";
import PrivacyAndNotifications from '../components/Settings/PrivacyAndNotifications.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const route = useRoute();
const store = useStore();

defineComponent({
    NavbarTop, RightSideMenu, AccountSettings,
    SecuritySettings, PrivacyAndNotifications
});
const state = reactive({
    currentMenu: "Account",
    rightSideMenu: [{
        name: "Account", link: "/account/settings"
    }, {
        name: "Security", link: "/account/settings/security"
    }, {
        name: "Privacy & Notifications", link: "/account/settings/privacy-and-notifications"
    }]
});

onMounted(() => {
    (state.rightSideMenu).forEach(elem => elem.link.toLowerCase() == route.path.toLowerCase()
        ? state.currentMenu = elem.name : null);
    store.dispatch("user/userSelf").then(r => console.log(r.data));
});



function changeMenu(menu) {
    state.currentMenu = menu.name;
}
</script>
