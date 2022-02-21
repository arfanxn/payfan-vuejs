<template>
    <div class>
        <form class="row p-0 m-0">
            <div class="col-2 px-1">
                <div class="form-floating mb-3">
                    <input
                        id="inputStartAt"
                        type="date"
                        class="form-control"
                        placeholder="name@example.com"
                    />
                    <label for="inputStartAt">Start</label>
                </div>
            </div>

            <div class="col-2 px-1">
                <div class="form-floating mb-3">
                    <input
                        type="date"
                        class="form-control"
                        id="inputEndAt"
                        placeholder="name@example.com"
                    />
                    <label for="inputEndAt">End</label>
                </div>
            </div>

            <div class="col-7 px-1">
                <div class="ps-0 form-floating mb-3 d-flex">
                    <input
                        id="inputSearch"
                        type="text"
                        class="form-control rounded-0 rounded-start"
                        placeholder="name@example.com"
                    />
                    <label for="inputSearch">Search Activities</label>
                    <button
                        class="btn btn-outline-primary rounded-0 rounded-end"
                        type="button"
                        id="button-addon2"
                    >
                        <img class="icon-search img-fluid" src="@/assets/icons/search.png" alt />
                    </button>
                </div>
            </div>

            <div class="col-1">
                <div class="d-flex justify-content-center my-2">
                    <DropdownFiltersActivity />
                </div>
            </div>
        </form>

        <div class="d-flex mx-1">
            <div
                v-if="ActivitiesStore.filter.by.status"
                class="rounded-pill filter-tag-oval px-3 d-flex justify-content-between me-2"
            >
                <small>{{ ActivitiesStore.filter.by.status }}</small>
                <small
                    @click="closeFilterTag(`status`)"
                    class="ms-3 mb-auto p-0 cursor-pointer fw-bold"
                >X</small>
            </div>
            <div
                v-if="ActivitiesStore.filter.by.transaction_type"
                class="rounded-pill filter-tag-oval px-3 d-flex justify-content-between"
            >
                <small>{{ ActivitiesStore.filter.by.transaction_type }}</small>
                <small
                    @click="closeFilterTag(`transaction_type`)"
                    class="ms-3 mb-auto p-0 cursor-pointer fw-bold"
                >X</small>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent } from "@vue/runtime-core"
import DropdownFiltersActivity from "./DropdownFiltersActivity.vue"
import { useActivitiesStore } from "@/stores/ActivitiesStore.js";
const ActivitiesStore = useActivitiesStore();

defineComponent({ DropdownFiltersActivity });


function closeFilterTag(filterBy) {
    switch (filterBy.toLowerCase()) {
        case "transaction_type":
            ActivitiesStore.updateFilterBy({ transaction_type: null });
            break;
        default:
            ActivitiesStore.updateFilterBy({ status: null });
            break;
    }
}
</script>

<style scoped>
.filter-tag-oval {
    background-color: #f8f8f8 !important;
    border: 1px solid #0070ba;
}
.icon-search {
    width: 25px;
    height: 25px;
}
</style>

