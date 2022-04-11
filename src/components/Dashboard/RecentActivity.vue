<template>
    <div class>
        <router-link to="/activity" class="text-navy hover-underline fw-bold fs-5">Recent Activity</router-link>
        <div class="mt-2">
            <div class>
                <span class="text-center fw-bold">No recent activity yet,</span>
                <small class="d-block">please do some transactions first.</small>
            </div>
        </div>
    </div>

    <!--  -->
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue"
const activities = ref({});

onMounted(async () => {
    const responseOfOrders = await axios.get("/api/user/self/orders", {
        params: {
            per_page: 3,
            start_at: (new Date( // "today/now" subtract by "7 days" 
                (
                    (new Date()/*current date*/).setDate((new Date()/**/).getDate() - 7 /*current date subtract by 7days and set*/)/**/
                )
                /**/) /**/).toISOString()
        }
    });
    activities.value = responseOfOrders.data.orders;
});

</script>