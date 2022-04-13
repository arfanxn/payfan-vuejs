<template>
    <main>
        <NavbarTop />
        <ActivitySearchAndFilters />

        <div class="bg-white mx-1 border rounded p-4 mt-4 mb-5">
            <p class="fw-bold">Activities</p>

            <div class="p-0 m-0">
                <small v-if="!Object.keys(ActivitiesStore['pagination/data']).length" class="px-3 fw-bold">
                    No activities
                    yet / activities on loading.
                </small>

                <div v-for="(activities, keyYearAndMonth, index) in ActivitiesStore['pagination/data']" :key="index">
                    <small class="px-3 mb-3 d-block fw-bold">
                        {{
                            Helpers.tap(new Date(keyYearAndMonth), date => `${DateHelper
                                .numericMonthtoString(date.getMonth()/**/, 3)} ${date.getFullYear()} `)
                        }}
                    </small>
                    <ActivityLists :key="index" :activities="activities" />
                </div>
            </div>
            <!--  -->

            <div class="mt-4 d-flex justify-content-between">
                <h6 class="fw-bold">Current Page : {{ ActivitiesStore['pagination/meta']['current_page'] }}</h6>
                <div>
                    <button :disabled="ActivitiesStore['pagination/meta']['current_page'] <= 1 ? true : false"
                        class="btn btn-outline-secondary me-3" @click="loadActivitiesPagination(1)">First</button>
                    <button :disabled="ActivitiesStore['pagination/meta']['current_page'] <= 1 ? true : false"
                        class="btn btn-primary mx-1" @click="loadActivitiesPagination(
                            parseInt(ActivitiesStore['pagination/meta']['current_page']) - 1
                        )">Prev</button>
                    <button class="btn btn-primary"
                        :disabled="ActivitiesStore['pagination/meta']['total_retrived'] < ActivitiesStore['pagination/meta']['per_page']"
                        @click="loadActivitiesPagination(
                            parseInt(ActivitiesStore['pagination/meta']['current_page']) + 1
                        
                        )">Next</button>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </main>
    <!--  -->
</template>

<script setup>
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import Footer from '../components/Layouts/Footer.vue';
import ActivitySearchAndFilters from '@/components/Activity/ActivitySearchAndFilters.vue';
import Helpers from '@/Helpers.js';
import DateHelper from '@/helpers/DateHelper.js';
import ActivityLists from '@/components/Activity/ActivityLists.vue';
import { defineComponent, onMounted, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useActivitiesStore } from '../stores/ActivitiesStore';
const ActivitiesStore = useActivitiesStore();
const route = useRoute();
defineComponent({ NavbarTop, ActivitySearchAndFilters, ActivityLists });

onMounted(() => {
    ActivitiesStore.updateFilterBy({ ...route.query });
    ActivitiesStore.fetch();
});

watch(() => ActivitiesStore.filter.by, () => {
    ActivitiesStore.fetch();
}, { deep: true })
function loadActivitiesPagination(page) {
    window.scrollTo(0, 0);
    ActivitiesStore.fetch(page);
}

onUnmounted(() => {
    ActivitiesStore.updateFilterBy({
        keyword: null,
        start_at: null,
        end_at: null,
        status: null,
        transaction_type: null,
    })
}); 
</script>

    <style scoped>
.icon-search {
    width: 25px;
    height: 25px;
}

.wrapper-activity:hover {
    background-color: rgba(108, 117, 125, 0.15) !important;
}
</style>