<template>
    <div class="rounded overflow-hidden bg-navy">
        <div id="articleCarousel" class="carousel slide " data-bs-ride="carousel">
            <div class="carousel-inner">
                <a v-for="(article, index) in state.articles" :key="index" class="carousel-item"
                    :class="index == 1 ? `active` : ``" :data-bs-interval="state.carouselSlideInterval"
                    :href="article.url" target="_blank">
                    <img class="articleCarouselThumbnailImage d-block " :src="article.urlToImage" :alt="article.title">
                    <div class="carousel-caption d-md-block text-white">
                        <h5 class="fw-bold ">{{ article.title }}</h5>
                        <small>{{ article.description }}</small>
                    </div>
                </a>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#articleCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button id="btnNextArticlesCarousel" class="carousel-control-next" type="button"
                data-bs-target="#articleCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    <!--  -->
</template>

<script setup>
import Helpers from '../../Helpers';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useAuthUserStore } from '@/stores/auth/AuthUserStore.js';
const state = reactive({
    articles: [],
    carouselSlideInterval: 3000,
});

const AuthUserStore = useAuthUserStore();

onMounted(async () => {
    const responseNewsAPI = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
            country: "us",
            category: "business",
            apiKey: "4bfd412d8b43456699df389b1b29b349",
        }
    });

    state.articles = responseNewsAPI.data.articles;

    setTimeout(() => document.getElementById("btnNextArticlesCarousel").click(), state.carouselSlideInterval)
}),

    Helpers; AuthUserStore;


</script>


<style >
.articleCarouselThumbnailImage {
    width: 100%;
    height: 250px;
    filter: brightness(50%);
    object-position: center;
}
</style>