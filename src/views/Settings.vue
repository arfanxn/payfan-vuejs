<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div class="col-md-8 bg-white p-0">
                <AccountSettings v-if="state.currentMenu == state.rightSideMenu[0].name" />
                <SecuritySettings v-if="state.currentMenu == state.rightSideMenu[1].name" />
                <PrivacyAndNotifications v-if="state.currentMenu == state.rightSideMenu[2].name" />
            </div>
            <div class="col-md-4">
                <RightSideMenu :menus="state.rightSideMenu" @menuClicked="changeMenu" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, reactive } from 'vue';
import NavbarTop from '../components/NavbarTop.vue';
import RightSideMenu from '../components/RightSideMenu.vue';
import AccountSettings from "@/components/Settings/AccountSettings.vue";
import SecuritySettings from "@/components/Settings/SecuritySettings.vue";
import PrivacyAndNotifications from '../components/Settings/PrivacyAndNotifications.vue';
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



function changeMenu(menu) {
    state.currentMenu = menu.name;

    // const menuNames = state.rightSideMenu.map(elem => elem.name);

    // switch (menu) {
    //     case menuNames[1]:
    //         state.currentMenu = menuNames[1];
    //         break;
    //     case menuNames[2]:
    //         state.currentMenu = menuNames[2];
    //         break;
    //     case menuNames[0]:
    //         state.currentMenu = menuNames[0];
    // }
}
</script>
