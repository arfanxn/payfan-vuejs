<template>
    <main>
        <NavbarTop />
        <SearchNFiltersActivity />

        <div class="bg-white mx-1 border rounded p-4 mt-4">
            <p class="fw-bold">All Activities</p>

            <div class="px-3">
                <small class="fw-bold">No activities yet.</small>
            </div>
        </div>
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