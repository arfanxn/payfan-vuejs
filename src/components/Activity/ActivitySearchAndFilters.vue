<template>
    <div class>
        <form @submit.prevent class="row p-0 m-0">
            <div class="col-2 px-1">
                <div class="form-floating mb-3">
                    <input @change="(e) => ActivitiesStore.updateFilterBy({ start_at: e.target.value })"
                        id="inputStartAt" type="date" class="form-control" :value="route.query.start_at" />
                    <label for="inputStartAt">Start</label>
                </div>
            </div>

            <div class="col-2 px-1">
                <div class="form-floating mb-3">
                    <input @change="(e) => ActivitiesStore.updateFilterBy({ end_at: e.target.value })" type="date"
                        class="form-control" id="inputEndAt" :value="route.query.end_at" />
                    <label for="inputEndAt">End</label>
                </div>
            </div>

            <div class="col-7 px-1">
                <div class="ps-0 form-floating mb-3 d-flex">
                    <input v-model.lazy.trim="searchKeyword" @keyup.enter="filterByKeyword" id="inputSearch" type="text"
                        class="form-control rounded-0 rounded-start" />
                    <label for="inputSearch">Search Activities</label>
                    <button @click="filterByKeyword" class="btn btn-outline-primary rounded-0 rounded-end" type="button"
                        id="button-addon2">
                        <img class="icon-search img-fluid" src="@/assets/icons/search.png" alt />
                    </button>
                </div>
            </div>

            <div class="col-1">
                <div class="d-flex justify-content-center my-2">
                    <ActivityDropdownFilterOptions />
                </div>
            </div>
        </form>

        <div class="d-flex fw-bold mx-1">
            <div v-if="ActivitiesStore.filter.by.status"
                class="rounded-pill filter-tag-oval ps-4 pe-2  d-flex justify-content-between me-2">
                <small>{{ ActivitiesStore.filter.by.status }}</small>
                <small @click="closeFilterTag(`status`)" class="ms-3 mb-auto p-0 cursor-pointer fw-bold">X</small>
            </div>
            <div v-if="ActivitiesStore.filter.by.transaction_type"
                class="rounded-pill filter-tag-oval ps-4 pe-2 d-flex justify-content-between">
                <small>{{ ActivitiesStore.filter.by.transaction_type }}</small>
                <small @click="closeFilterTag(`transaction_type`)"
                    class="ms-3 mb-auto p-0 cursor-pointer fw-bold">X</small>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, ref, watch } from "vue";
import ActivityDropdownFilterOptions from "./ActivityDropdownFilterOptions.vue";
import { useActivitiesStore } from "@/stores/ActivitiesStore.js";
import { useRoute } from "vue-router";
const ActivitiesStore = useActivitiesStore();
const route = useRoute();
defineComponent({ ActivityDropdownFilterOptions });

const searchKeyword = ref(route.query.keyword || route.query.keywords || "");

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

// if there is any chnages in "searchKeyword" update the filterKeyword
watch(searchKeyword, () => filterByKeyword(), { deep: true });

//  if the url query contains "keyword" / "keywords" and some changes detected then update the "searchKeyword"
watch(() => [route.query.keyword, route.query.keywords], () => {
    searchKeyword.value = route.query.keyword || route.query.keywords;
}, { deep: true });

// a function to update the filterByKeyword 
function filterByKeyword() {
    ActivitiesStore.updateFilterBy({ keyword: searchKeyword.value });
}
</script>

<style scoped>
.filter-tag-oval {
    background-color: #f8f8f8 !important;
    border: 3px solid #0070ba;
}

.icon-search {
    width: 25px;
    height: 25px;
}
</style>

