<template>
  <router-view class="container-md custom-container"></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthUserStore } from './stores/auth/AuthUserStore.js';
const AuthUserStore = useAuthUserStore();

onMounted(() => {
  document.body.classList.add("bg-light");

  if (AuthUserStore.isLoggedIn) {
    AuthUserStore.fetch();

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


