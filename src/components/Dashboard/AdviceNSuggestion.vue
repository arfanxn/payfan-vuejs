<template>
    <main>

        <div v-if="AuthUserStore.data['profile_pict']?.includes(`#`)"
            class="card suggestion-card border-0 rounded overflow-hidden bg-navy text-white">
            <img :src="randomImgUrl" class="card-img" alt="">
            <div class="card-img-overlay w-100">
                <h5 class="card-title fw-bold ">Let others know they have the right account</h5>
                <div class="bg-white w-100 position-absolute bottom-0 start-0 px-3 py-2">
                    <router-link to="/account/settings" class="text-navy fw-bold">
                        Add your photo
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else class="card advice-card border-0 rounded overflow-hidden bg-navy text-white">
            <img :src="randomImgUrl" class="card-img" alt="">
            <div class="card-img-overlay w-100 d-flex">
                <h5 class="card-text fw-light text-center my-auto w-100 px-3 text-white text-break">{{
                    slipAdvice?.advice
                }}</h5>
                <div class="w-100 position-absolute bottom-0 start-0 px-3 py-3">
                    <button @click="loadRandomAdvice" class="btn btn-outline-secondary rounded-pill py-0 fw-bold">
                        Refresh advice
                    </button>
                </div>
            </div>
        </div>

    </main>
    <!--  -->
</template>

<script setup>
// import Helpers from '../../Helpers';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useAuthUserStore } from '../../stores/auth/AuthUserStore.js';
const AuthUserStore = useAuthUserStore();

const randomImgUrl = `https://source.unsplash.com/random/600x250/?` + `wallpapers`;
const slipAdvice = ref({});

onMounted(() => {
    loadRandomAdvice()
});

function loadRandomAdvice() {
    const slipIDRange = { max: 224, min: 1 };
    const randomSlipID = Math.floor(Math.random() * (
        slipIDRange.max - (slipIDRange.min + 1)/**/))
        + slipIDRange.min;

    axios.get(`https://api.adviceslip.com/advice/${randomSlipID}`).then(r => {
        slipAdvice.value = r.data.slip
    })
}

</script>

<style scoped>
.suggestion-card {
    width: 100%;
    height: 250px;
}

.advice-card {
    width: 100%;
    height: 200px;
}


.card-img {
    filter: brightness(25%);
    height: 100% !important;
    object-position: center;
}
</style>