<template>
    <main>
        <NavbarTop />   
        <SearchNFiltersActivity />

        <div class="bg-white mx-1 border rounded p-4 mt-4">
            <p class="fw-bold">All Activities</p>

            <div class="p-0 m-0">
                <div class="px-3 mb-4">
                    <!-- <small class="fw-bold">No activities yet.</small> -->
                    <small class="fw-bold">Dec 2021</small>
                </div>
                <router-link
                    to="/"
                    class="wrapper-activity d-flex justify-content-between cursor-pointer py-3 px-4"
                    v-for="(item, index) in [1, 5]"
                    :key="index"
                >
                    <div class="d-flex text-dark w-100">
                        <div
                            class="contact-icon-size bg-warning rounded-circle d-flex justify-content-center"
                        >
                            <span class="fw-bold my-auto">AM</span>
                        </div>
                        <div class="ms-3 text-secondary">
                            <p class="fw-bold my-auto text-dark">Alif Maulana</p>

                            <small class="d-block">6 Dec</small>
                            <small class="d-block">Send Money</small>
                            <small class="d-block">"Thanks mate!"</small>

                            <div
                                class="rounded-pill border-navy border text-navy fw-bold d-flex justify-content-center px-2 mt-2"
                            >
                                <span class="my-auto">Repeat this transaction</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-dark">
                        <p class="fw-bold">-&nbsp;100,00&nbsp;$</p>
                    </div>
                </router-link>
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

.contact-icon-size {
    width: 40px;
    height: 40px;
}

.wrapper-activity:hover {
    background-color: rgba(108, 117, 125, 0.15) !important;
}
</style>