<template>
  <div class="home">
    <NavbarTop />
    <div class="row mt-2 p-0 m-0">
      <div class="col-md-7 p-0 m-0">
        <h2 class="mb-4">Hello, {{ AuthUserStore.data.name }}</h2>
        <WalletCard />
      </div>
      <div class="col-md-5 p-0 ps-5 pe-4 m-0">
        <TransferMenu />

        <SendAgain />

        <RecentActivity />
      </div>
    </div>  </div>
</template>

<script setup>
// @ is an alias to /src
import NavbarTop from '../components/NavbarTop.vue';
import WalletCard from '../components/Dashboard/WalletCard.vue';
import TransferMenu from '../components/Dashboard/TransferMenu.vue';
import RecentActivity from '../components/Dashboard/RecentActivity.vue';
import SendAgain from '../components/Dashboard/SendAgain.vue';
import { defineComponent, onMounted } from 'vue';
import { useAuthUserStore } from '@/stores/auth/AuthUserStore.js';
import { useContactsStore } from '../stores/ContactsStore';
const ContactsStore = useContactsStore();
const AuthUserStore = useAuthUserStore();

defineComponent({
  NavbarTop, TransferMenu, WalletCard, RecentActivity, SendAgain
})

onMounted(() => {
  ContactsStore.fetch({ per_page: 5 });
});

</script>

<style scoped>
</style>
