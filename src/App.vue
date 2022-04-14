<template>
  <router-view class="container-md custom-container">
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import NotificationService from './services/NotificationService.js';
import { useAuthUserStore } from './stores/auth/AuthUserStore.js';
import { useNotificationsStore } from './stores/NotificationsStore.js';
const NotificationsStore = useNotificationsStore();
const AuthUserStore = useAuthUserStore();

onMounted(() => {
  const app = document.getElementById("app");
  if (app) {
    app.style.minHeight = "100vh";
  }

  if (AuthUserStore.isLoggedIn) { // if user is logged in
    AuthUserStore.fetch().then(r => {
      if (r.status == 200) {
        NotificationService.latest().then(r => {
          if (r.status == 200) NotificationsStore.pushLatest(r.data.notifications);
        })

        // listen live notifications
        window.Echo.private('users.' + AuthUserStore.data['id']).notification(notification => {
          NotificationsStore.realtimeLatest(notification);
        } /**/);
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


