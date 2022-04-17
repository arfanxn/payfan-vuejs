<template>
  <main class="d-flex justify-content-center">
    <div class="col-md-8 col-12 bg-white my-auto border border-top-0 rounded">
      <div class="
          bg-navy
          p-3
          rounded-top
          d-flex
          justify-content-between
          text-white
        ">
        <div class="my-auto">
          <h5 class="fw-bold">{{ Helpers.ENV("APP_TITLE") }}</h5>
        </div>
        <div class="my-auto">
          <router-link to="/auth/login" class="text-decoration-none text-white fw-bold d-inline me-3">Login
          </router-link>
          <router-link to="/auth/register" class="text-decoration-none text-white fw-bold d-inline">Register
          </router-link>
        </div>
      </div>

      <div class="p-4">
        <keep-alive>
          <Login v-if="currentMenu == `login`"></Login>
        </keep-alive>
        <keep-alive>
          <Register v-if="currentMenu == `register`"></Register>
        </keep-alive>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Helpers from "../Helpers";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
const route = useRoute();

const currentMenu = ref("login");

defineComponent({ Login, Register });

watch(() => route.params.menu, (newValue) => {

  if (typeof newValue == "string")
    if (newValue.toLowerCase().includes('register')) {
      currentMenu.value = "register";
    } else {
      currentMenu.value = "login";
    }

});
</script>

<style scoped>
main {
  margin-bottom: 200px !important;
  min-height: 100vh;
}
</style>