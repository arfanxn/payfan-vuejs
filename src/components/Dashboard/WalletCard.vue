<template>
  <div class="bg-white shadow-sm rounded-3 pt-3 pb-4 px-4 d-flex justify-content-between">
    <div class>
      <h5 class="text-navy fw-bold mb-3">{{ Helpers.ENV("APP_TITLE") }} balance</h5>
      <h1 class="fw-light my-0 py-0">{{ AuthUserStore.wallet?.data?.balance }} $</h1>
      <small class="text-secondary d-block mb-3">Available</small>
      <router-link
        to="/transfer/send"
        class="fw-bold rounded-pill py-1 px-3 border border-1 border-navy text-navy text-decoration-none"
      >
        <small>Transfer Funds</small>
      </router-link>
    </div>

    <div class="dropstart cursor-pointer">
      <img
        class="vertical-dots dropdown-toggle"
        src="@/assets/icons/three-vertical-dots-black.png"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      />
      <ul class="dropdown-menu shadow">
        <router-link class="dropdown-item text-dark" to="/help">Get Help</router-link>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Helpers from '../../Helpers';
import { useAuthUserStore } from '@/stores/auth/AuthUserStore.js';
const AuthUserStore = useAuthUserStore();
</script>

<style scoped>
.vertical-dots {
  width: 20px;
  height: 20px;
}
</style>