<template>
    <main class="dropdown">
        <a
            class="cursor-pointer nav-link fw-bold fs-6 d-flex text-center text-navy fw-bold hover-underline"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >Filters</a>
        <div class="dropdown-menu py-3 px-4 dropdown-menu-filters">
            <main class="d-flex justify-content-between">
                <div class="w-100 me-1">
                    <header class="mb-3">Filter by status</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            v-for="(filterBy, index) in state.filters_option.filter_by_status"
                            :key="index"
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">{{ filterBy.name }}</span>
                        </a>
                    </div>
                </div>

                <div class="mx-2 border-end border-secondary"></div>

                <div class="w-100 ms-1">
                    <header class="mb-3">Filter by transaction type</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            v-for="(filterBy, index) in state.filters_option.filter_by_transaction_type"
                            :key="index"
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">{{ filterBy.name }}</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue';
const state = reactive({
    filters_option: {
        filter_by_status: [
            { name: "Completed" }, { name: "Pending" }, { name: "Failed" }
        ],
        filter_by_transaction_type: [
            { name: "Send" }, { name: "Reqeust" }, { name: "Received" }
        ]
    }
});
state;

</script>

<style scoped>
.wrapper-filter-menu-lists a:hover {
    background-color: rgba(0, 48, 135, 0.85);
    color: #fff !important;
}

.dropdown-menu-filters {
    width: 450px;
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 100% !important;
}
</style>