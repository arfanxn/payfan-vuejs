<template>
    <div class>
        <NavbarTop />
        <div class="row p-0 m-0">
            <div
                class="col-md-8 bg-white"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi qui illum rerum ad possimus recusandae eaque? Labore sed voluptas totam quo iste quod, modi amet adipisci? Modi nam blanditiis, debitis, repellat vel, fugit quod qui corporis culpa accusantium maiores aspernatur dolor sit in atque id soluta rerum eligendi dolorem. Aperiam.</div>
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
defineComponent({ NavbarTop, RightSideMenu });
const state = reactive({
    rightSideMenu: [{
        name: "Account", link: "/account/settings"
    }, {
        name: "Security", link: "/account/settings/security"
    }, {
        name: "Data & Privacy", link: "/account/settings/data-and-privacy"
    }]
});



function changeMenu(event, menu) {
    console.log(event);
    console.log(menu);
}
</script>

<style scoped>
</style>