<template>
    <main class="dropdown">
        <a
            class="cursor-pointer nav-link fw-bold fs-6 d-flex text-center text-navy fw-bold hover-underline"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >Filters</a>
        <div
            class="dropdown-menu py-3 px-4 dropdown-menu-filters"
            @click="e => e.stopPropagation()"
        >
            <main class="d-flex justify-content-between">
                <div class="w-100 me-1">
                    <header class="mb-3">Filter by status</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            @click.prevent="filterByStatus($event)"
                            v-for="(filterBy, index) in ActivitiesStore.filter.options.status"
                            :key="index"
                            class="option-filter-by-tx-type text-center border border-navy d-flex w-100 rounded-pill cursor-pointer text-dark mb-2 overflow-hidden"
                            :class="{ 'option-filter-clicked': ActivitiesStore.filter.by.status == filterBy }"
                        >
                            <span class="d-block w-100 h-100 text-center py-1">{{ filterBy }}</span>
                        </a>
                    </div>
                </div>

                <div class="mx-2 border-end border-secondary"></div>

                <div class="w-100 ms-1">
                    <header class="mb-3">Filter by transaction type</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            @click.prevent="filterByTxType($event)"
                            v-for="(filterBy, index) in ActivitiesStore.filter.options.transaction_type"
                            :key="index"
                            class="option-filter-by-tx-type text-center border border-navy d-flex w-100 rounded-pill cursor-pointer text-dark mb-2 overflow-hidden"
                            :class="{ 'option-filter-clicked': ActivitiesStore.filter.by.transaction_type == filterBy }"
                        >
                            <span class="d-block w-100 h-100 text-center py-1">{{ filterBy }}</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </main>
</template>


<script setup>
import { useActivitiesStore } from "@/stores/ActivitiesStore.js";
const ActivitiesStore = useActivitiesStore();

function filterByStatus(event) {
    ActivitiesStore.updateFilterBy({ status: event.target.childNodes[0].textContent })
}
function filterByTxType(event) {
    ActivitiesStore.updateFilterBy({ transaction_type: event.target.childNodes[0].textContent })
}
</script>

<style scoped>
.wrapper-filter-menu-lists a:hover {
    background-color: rgba(0, 48, 135, 0.85) !important;
    color: #fff !important;
}

.option-filter-clicked {
    background-color: rgba(0, 48, 135, 1) !important;
    color: #fff !important;
}

.dropdown-menu-filters {
    width: 450px;
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 100% !important;
}
</style>