<template>
  <div class="home">
    <NavbarTop />
    <div class="row mt-2 p-0 m-0">
      <div class="col-md-7 p-0 m-0">
        <h2 class="mb-4">Hello, {{ AuthUserStore.data.name }}</h2>
        <WalletCard />

        <ArticlesCarousel class="mt-5" />

        <SettingSuggestionsCard class="mt-5" />
      </div>
      <div class="col-md-5 p-0 ps-5 pe-4 m-0">
        <TransferMenu />

        <SendAgain />

        <RecentActivity />

      </div>
    </div>

    <Footer />
  </div>
  <!--  -->
</template>

<script setup>
// @ is an alias to /src
import { defineComponent, onMounted } from 'vue';
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import Footer from '../components/Layouts/Footer.vue';
import WalletCard from '../components/Dashboard/WalletCard.vue';
import SettingSuggestionsCard from '../components/Dashboard/SettingSuggestionsCard';
import ArticlesCarousel from '../components/Dashboard/ArticlesCarousel.vue';
import TransferMenu from '../components/Dashboard/TransferMenu.vue';
import RecentActivity from '../components/Dashboard/RecentActivity.vue';
import SendAgain from '../components/Dashboard/SendAgain.vue';
import { useAuthUserStore } from '@/stores/auth/AuthUserStore.js';
import { useContactsStore } from '../stores/ContactsStore';
const ContactsStore = useContactsStore();
const AuthUserStore = useAuthUserStore();

defineComponent({
  NavbarTop, TransferMenu, WalletCard, RecentActivity, SendAgain, SettingSuggestionsCard, ArticlesCarousel
})

onMounted(() => {
  ContactsStore.fetch({
    order_by: "last_transaction:desc",
    favorited: 1,
    blocked: 0,
    added: 1,

    // parameters for handling pagination/paginator
    per_page: 5,
    page: 1,
  });
});

</script>

<style scoped>
</style>
