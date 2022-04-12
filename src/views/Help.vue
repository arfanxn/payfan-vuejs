<template>
  <div class="help">
    <NavbarTop />
    <div class="text-center my-5 py-3 border border-3 border-navy bg-white rounded-pill">
      <h2 class="text-center fw-bold text-dark mb-2">Need Some Help?</h2>
      <h4>
        Inform your Complaint/Help to our Help Center at
        <span class="text-decoration-underline">arfan2173@gmail.com</span> ,
        <br />We will reponse as soon as possible and we serve our Customers 24H.
      </h4>
    </div>  </div>
</template>

<script setup>
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import { defineComponent } from 'vue'
defineComponent({
  NavbarTop
})
</script>

