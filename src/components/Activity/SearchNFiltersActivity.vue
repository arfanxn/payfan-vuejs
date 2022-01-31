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
    </div>
</template>

<script setup>
import { defineComponent } from "@vue/runtime-core"
import DropdownFiltersActivity from "./DropdownFiltersActivity.vue"
defineComponent({ DropdownFiltersActivity });

</script>

<style scoped>
.icon-search {
    width: 25px;
    height: 25px;
}
</style>

