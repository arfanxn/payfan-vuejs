<template>
    <main>
        <NavbarTop />
        <SearchNFiltersActivity />
    </main>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import SearchNFiltersActivity from '@/components/Activity/SearchNFiltersActivity.vue';
import { defineComponent } from 'vue';
defineComponent({ NavbarTop, SearchNFiltersActivity });


</script>

<style scoped>
.icon-search {
    width: 25px;
    height: 25px;
}
</style>