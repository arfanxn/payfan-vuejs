<template>
  <div class="about">
    <NavbarTop />
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import { defineComponent } from 'vue'
defineComponent({
  NavbarTop
})
</script>
