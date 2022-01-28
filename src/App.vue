<template>
  <router-view class="container-md custom-container pt-5 mt-5"></router-view>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.classList.add("bg-light");
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


