<template>
    <div class>
        <router-link to="/activity" class="text-navy hover-underline fw-bold fs-5">Recent Activity</router-link>
        <div class="mt-2 d-flex flex-column">

            <div v-if="activities.length < 1">
                <span class="text-center fw-bold">No recent activity yet,</span>
                <small class="d-block">please do some transactions first.</small>
            </div>

            <router-link v-for="(activity, index) in activities" :key="index"
                :to="{ path: `/activity`, query: { keyword: activity.id } }"
                class="wrapper-activity d-flex justify-content-between cursor-pointer py-2 text-dark "
                :class="(index + 1) < (activities.length) ? `border-bottom border-secondary` : ``">
                <div class="d-flex">
                    <UserAvatar class="my-auto"
                        v-if="activity.type?.toUpperCase()?.includes(`SENDING`) || activity.type?.toUpperCase()?.includes(`REQUESTING`)"
                        :user="activity.to_wallet.user" style="width:47.5px ; height:47.5px" />
                    <UserAvatar v-else class="my-auto" :user="activity.from_wallet.user"
                        style="width:47.5px ; height:47.5px" />
                    <!-- <UserAvatar class="my-auto" style="width:47.5px; height:47.5px" /> -->
                    <div class="p-0 ms-3">
                        <p class="fw-bold text-dark d-block m-0 p-0"> {{
                            (/**/activity.type?.toUpperCase()?.includes(`SENDING`) ||
                                activity.type?.toUpperCase()?.includes(`REQUESTING`)
                                ? activity.to_wallet.user.name
                                : activity.from_wallet.user.name/**/).substr(0, 15)
                        }}</p>
                        <small class="fs-7 d-block lh-1 m-0 p-0">{{
                            Helpers.tap(new Date(activity.started_at || activity.created_at), date =>
                                date.getDate() + " " + DateHelper.numericMonthtoString(date.getMonth())
                            )
                        }}</small>
                        <small class="fs-7  lh-1 m-0 p-0">{{ activity.type }}</small>
                    </div>
                </div>

                <div class="fs-7 fw-bold">
                    <!-- if the status still pending make the text amount color gray (ambigous) -->
                    <span class="text-secondary" v-if="activity.status?.toUpperCase()?.includes(`PENDING`)">
                        ${{
                            StrHelper.make(activity.amount).toUSD(false).get()
                        }}</span>
                    <!-- end -->

                    <!-- if the status completed and order type is either SEND or REQUESTED  make the text amount color red (subtraction) -->
                    <span class="text-danger" v-else-if="
                    (activity.type?.toUpperCase()?.includes(`SEND`) || activity.type?.toUpperCase()?.includes(`REQUESTED`))
                    && activity.status?.toUpperCase()?.includes(`COMPLETE`)">-&nbsp;${{
        StrHelper.make(activity.amount).toUSD(false).get()
    }}</span><!-- end -->

                    <!-- if the status completed and order type is either REQUESTING or RECEIVING or GIFT  make the text amount color green (addaction) -->
                    <span class="text-success" v-else-if="(activity.type?.toUpperCase()?.includes(`REQUESTING`)
                    || activity.type?.toUpperCase()?.includes(`RECEIV`)
                    || activity.type?.toUpperCase()?.includes(`GIFT`))
                    && activity.status?.toUpperCase()?.includes(`COMPLETE`)">+&nbsp;${{
        StrHelper.make(activity.amount).toUSD(false).get()
    }}</span><!-- end  -->

                    <!-- if the status FAILED or REJECTED make the text amount color danger  -->
                    <span class="text-danger" v-else-if="activity.status?.toUpperCase()?.includes(`FAIL`)
                    || activity.status?.toUpperCase()?.includes(`REJECT`)">x&nbsp;{{
        StrHelper.make(activity.amount).toUSD(false).get()
    }}&nbsp;$</span><!-- end -->

                </div>
                <!--  -->
            </router-link>

            <!--  -->

            <div class="mt-3">
                <router-link class="btn btn-outline-primary rounded-pill fs-7 py-1 px-3"
                    :to="{ path: `/activity`, query: {} }">Show
                    all
                </router-link>
            </div>
        </div>
    </div>

    <!--  -->
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue"
import Helpers from "../../Helpers";
import StrHelper from "../../helpers/StrHelper.js";
import DateHelper from "../../helpers/DateHelper.js";
import UserAvatar from "../Avatar/UserAvatar.vue";
import { useAuthUserStore } from "../../stores/auth/AuthUserStore";
const AuthUserStore = useAuthUserStore();
const activities = ref([]);

onMounted(async () => {
    activities.value = await fetchRecentActivities();

    window.Echo.private('payments.' + AuthUserStore.data['id'])
        .listen("PaymentSavedEvent", event => {
            event.payment.to_wallet.user.profile_pict =
                event.payment.to_wallet.user.profile_pict.replace('http://payfan.test',
                    Helpers.ENV("VUE_APP_LARAVEL_URL"));

            event.payment.from_wallet.user.profile_pict =
                event.payment.from_wallet.user.profile_pict.replace('http://payfan.test',
                    Helpers.ENV("VUE_APP_LARAVEL_URL"));

            // if already exist filter it (delete) and replace with new value (replace by unshift) ; 
            activities.value = activities.value.filter(activity => activity.id != event.payment.id);
            //  unshift new value 
            activities.value.unshift(event.payment);
        });

});


async function fetchRecentActivities() {
    const response = await axios.get("/api/user/self/orders", {
        params: {
            per_page: 3,
            start_at: (new Date( // "today/now" subtract by "7 days" 
                (
                    (new Date()/*current date*/).setDate((new Date()/**/).getDate() - 7 /*current date subtract by 7days and set*/)/**/
                )
                /**/) /**/).toISOString()
        }
    });
    let results = [];
    Object.keys(response.data.orders.data).forEach(key => {
        results.push(...response.data.orders.data[key]);
    });
    return results;
}
</script>

<style scoped>
.wrapper-activity:hover {
    border-bottom: 2px solid black !important;
}
</style>