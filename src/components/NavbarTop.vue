<template>
    <teleport to="#navbar-top">
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-navy">
            <div class="container-md navbar-custom-container">
                <a class="navbar-brand fw-bold fs-3" href="/">Payfan</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse d-md-flex justify-content-between"
                    id="navbarNavAltMarkup"
                >
                    <div class="navbar-nav d-flex justify-content-end">
                        <router-link
                            v-for="(navb, index ) in state.navbars"
                            :key="index"
                            class="nav-link nav-link-left-side d-flex px-3 mx-1 fs-6 fw-bold rounded-pill active"
                            :to="navb.link"
                        >
                            <small class="my-auto">{{ navb.text }}</small>
                        </router-link>
                    </div>
                    <div class="navbar-nav">
                        <a href="#" class="nav-link fw-bold fs-6 d-flex">
                            <img
                                class="nav-link-icon my-auto"
                                src="../assets/icons/bell-ring.png"
                                alt="Notifications"
                            />
                        </a>
                        <a href="#" class="nav-link fw-bold fs-6 d-flex">
                            <img
                                class="nav-link-icon my-auto"
                                src="../assets/icons/settings.png"
                                alt="Settings"
                            />
                        </a>
                        <a href class="nav-link fw-bold fs-6" @click.prevent="handleLogout()">
                            <small>LOG OUT</small>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </teleport>
</template>

<script setup>
import { reactive } from 'vue';
import AuthService from '../services/AuthService';
const state = reactive({
    "navbars": [
        {
            "link": "/",
            "text": "Dashboard"
        },
        {
            "link": "/about",
            "text": "Send and Request"
        },
        {
            "link": "/about",
            "text": "Activity"
        },
        {
            "link": "/help",
            "text": "Help"
        },
    ]
});

function handleLogout() {
    AuthService.logout().then(res => {
        if (res.status == 200) {
            window.location = "/authenticate"
        }
    });
}
</script>

<style scoped>
.navbar-custom-container {
    padding: 7.5px 175px 7.5px 175px;
}

.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
}

.nav-link-left-side:hover {
    /* transition: #fff 1s ease; */
    border: 0.5px solid #fff;
}

.nav-link-icon {
    width: 25px;
    height: 25px;
    color: white;
}
</style>