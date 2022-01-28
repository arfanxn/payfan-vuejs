<template>
  <div class="home">
    <NavbarTop />
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1 class="text-danger">BS5</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavbarTop from '../components/NavbarTop.vue';
import { defineComponent } from 'vue'

defineComponent({
  NavbarTop
})

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavbarTop
  }
}
</script>
