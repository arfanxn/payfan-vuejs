<template>
  <div class="home">
    <NavbarTop />
    <div class="row mt-2 p-0 m-0">
      <div class="col-md-7 p-0 m-0">
        <h2 class="mb-4">Hello, {{ UserStore.self.name }}</h2>
        <WalletCard />
      </div>
      <div class="col-md-5 p-0 ps-5 pe-4 m-0">
        <TransferMenu />

        <SendAgain />

        <RecentActivity />
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import NavbarTop from '../components/NavbarTop.vue';
import WalletCard from '../components/Dashboard/WalletCard.vue';
import TransferMenu from '../components/Dashboard/TransferMenu.vue';
import RecentActivity from '../components/Dashboard/RecentActivity.vue';
import SendAgain from '../components/Dashboard/SendAgain.vue';
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore.js';
const UserStore = useUserStore();

defineComponent({
  NavbarTop, TransferMenu, WalletCard, RecentActivity, SendAgain
})
</script>

<style scoped>
</style>
