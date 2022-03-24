<template>
  <router-view class="container-md custom-container"></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/UserStore.js';
import { useWalletStore } from './stores/WalletStore';
const UserStore = useUserStore();
const WalletStore = useWalletStore();

onMounted(() => {
  document.body.classList.add("bg-light");

  if (UserStore['self/isLoggedIn']) {
    UserStore.fetchSelf().then(r => {
      if (r.status == 200) {
        WalletStore.self = r.data.data.wallet;
      }
    });
  }


});

</script>

<style>
a {
  text-decoration: none;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


