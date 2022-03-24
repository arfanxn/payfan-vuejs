<template>
    <main>
        <NavbarTop />
        <SearchNFiltersActivity />

        <div class="bg-white mx-1 border rounded p-4 mt-4">
            <p class="fw-bold">Activities</p>

            <div class="p-0 m-0">
                <small
                    v-if="!Object.keys(ActivitiesStore['pagination/data']).length"
                    class="px-3 fw-bold"
                >No activities yet.</small>

                <div
                    v-for="(activities, keyYearAndMonth, index) in ActivitiesStore['pagination/data']"
                    :key="index"
                >
                    <small class="px-3 mb-3 d-block fw-bold">
                        {{
                            Helpers.tap(new Date(keyYearAndMonth), date => `${DateHelper
                                .numericMonthtoString(date.getMonth()/**/, 3)} ${date.getFullYear()} `)
                        }}
                    </small>
                    <ActivityList :key="index" :activities="activities" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import NavbarTop from '../components/NavbarTop.vue';
import SearchNFiltersActivity from '@/components/Activity/SearchNFiltersActivity.vue';
import Helpers from '@/Helpers.js';
import DateHelper from '@/helpers/DateHelper.js';
import ActivityList from '@/components/Activity/ActivityList.vue';
import { defineComponent, onMounted, watch } from 'vue';
import { useActivitiesStore } from '../stores/ActivitiesStore';
const ActivitiesStore = useActivitiesStore();
defineComponent({ NavbarTop, SearchNFiltersActivity, ActivityList });

onMounted(() => {
    ActivitiesStore.fetch();
});

watch(() => ActivitiesStore.filter.by, () => {
    ActivitiesStore.fetch();
}, { deep: true })

</script>

<style scoped>
.icon-search {
    width: 25px;
    height: 25px;
}

.contact-icon-size {
    width: 40px;
    height: 40px;
}

.wrapper-activity:hover {
    background-color: rgba(108, 117, 125, 0.15) !important;
}
</style>