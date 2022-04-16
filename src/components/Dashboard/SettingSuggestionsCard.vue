<template>
    <main>

        <div v-if="AuthUserStore.data['profile_pict']?.includes(`#`)"
            class="card border-0 rounded overflow-hidden bg-navy text-white">
            <img :src="`https://source.unsplash.com/random/600x250/?` + `wallpapers`" class="card-img" alt="">
            <div class="card-img-overlay w-100">
                <h5 class="card-title fw-bold ">Let others know they have the right account</h5>
                <div class="bg-white w-100 position-absolute bottom-0 start-0 px-3 py-2">
                    <router-link to="/account/settings" class="text-navy fw-bold">
                        Add your photo
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else class="card border-0 rounded overflow-hidden bg-navy text-white">
            <img :src="`https://source.unsplash.com/random/600x250/?` + `wallpapers`" class="card-img" alt="">
            <div class="card-img-overlay w-100">
                <h5 class="card-title fw-bold ">Account Settings</h5>
                <div class="bg-white w-100 position-absolute bottom-0 start-0 px-3 py-2">
                    <router-link to="/account/settings" class="text-navy fw-bold">
                        Go to settings
                    </router-link>
                </div>
            </div>
        </div>

    </main>
    <!--  -->
</template>

<script setup>
// import Helpers from '../../Helpers';
import { onMounted, } from 'vue';
import { useAuthUserStore } from '../../stores/auth/AuthUserStore.js';
const AuthUserStore = useAuthUserStore();

onMounted(() => {
});
</script>

<style scoped>
.card {
    width: 100%;
    height: 250px;
}

.card-img {
    filter: brightness(50%);
    object-position: center;
}
</style>