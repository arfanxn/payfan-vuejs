<template>
    <div class>
        <div v-for="(order, index) in props.activities" :key="index">
            <div
                class="d-flex justify-content-between wrapper-activity cursor-pointer py-3 px-4"
                @click="toggleActivityDetails(order)"
            >
                <div class="d-flex text-dark w-100">
                    <!--  -->
                    <div
                        v-if="isActivityTypeIsSendingOrRequesting(order)"
                        class="contact-icon-size rounded-circle d-flex overflow-hidden justify-content-center"
                        :style="`background-color : ${order.to_wallet.user.profile_pict} !important; `"
                    >
                        <span
                            v-if="order.to_wallet.user.profile_pict.includes('#')"
                            class="fw-bold my-auto text-white"
                        >
                            {{
                                StrHelper.make(order?.to_wallet?.user?.name).firstCharEachWord().get().slice(0, 2)
                            }}
                        </span>
                        <img v-else :src="order.to_wallet.user.profile_pict" />
                    </div>
                    <div
                        v-else
                        class="contact-icon-size rounded-circle d-flex overflow-hidden justify-content-center"
                        :style="`background-color : ${order.from_wallet.user.profile_pict} !important; `"
                    >
                        <span
                            v-if="order.from_wallet.user.profile_pict.includes('#')"
                            class="fw-bold my-auto text-white"
                        >
                            {{
                                StrHelper.make(order?.from_wallet?.user?.name).firstCharEachWord().get().slice(0, 2)
                            }}
                        </span>
                        <img v-else :src="order.from_wallet.user.profile_pict" />
                    </div>

                    <!--  -->
                    <div class="ms-3 text-secondary w-100">
                        <div class="d-flex justify-content-between">
                            <p class="fw-bold my-auto text-dark">
                                {{
                                    isActivityTypeIsSendingOrRequesting(order)
                                        ? order.to_wallet.user.name
                                        : order.from_wallet.user.name
                                }}
                            </p>
                            <!--  -->
                            <p class="fw-bold my-auto text-dark">{{ order.amount }}&nbsp;$</p>
                        </div>

                        <small class="d-block">
                            {{
                                Helpers.tap(new Date(order.started_at), date => {
                                    return date.getDate() + " " + DateHelper.numericMonthtoString(date.getMonth());
                                })
                            }}
                        </small>
                        <small class="d-block">{{ order.type }}</small>
                        <small class="d-block">{{ `"${order.note.substring(0, 100)}"` }}</small>

                        <div class="d-flex justify-content-between mt-2">
                            <div class>
                                <!-- show this if order type is sending money -->
                                <button
                                    @click.stop="test"
                                    v-if="(order.type?.toUpperCase()?.includes(`SEND`))"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                >
                                    <small class="my-auto">Repeat this transaction</small>
                                </button>

                                <!-- show this if order type is requesting and order status is pending and waiting for approval from the related order wallet (to_wallet)-->
                                <button
                                    @click.stop
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTING`))"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                >
                                    <small class="my-auto">Repeat this request</small>
                                </button>

                                <!-- show this if order type is requested and order status is pending and not accepted/approved yet -->
                                <button
                                    @click.stop
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                    !(order.status?.toUpperCase()?.includes(`COMPLETE`))"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                >
                                    <small class="my-auto">Approve request money</small>
                                </button>

                                <!-- show this if order type is requested and order is already completed and already accepted/approved -->
                                <small
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                    (order.status?.toUpperCase()?.includes(`COMPLETE`))"
                                    class="my-auto fw-bold text-center py-0 text-dark"
                                >
                                    Request from {{
                                        `"${order.from_wallet.user.name?.substring(0, 20)}"`
                                    }} has been already approved by
                                    you
                                </small>

                                <!-- show this if order type is requested and order is rejected -->
                                <small
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                    (order.status?.toUpperCase()?.includes(`REJECT`))"
                                    class="my-auto fw-bold text-center py-0 text-dark"
                                >
                                    Request from {{
                                        `"${order.from_wallet.user.name?.substring(0, 20)}"`
                                    }} has been already rejected by
                                    you
                                </small>
                            </div>

                            <div class>
                                <button
                                    class="btn btn-outline-secondary d-flex rounded-pill fw-bold px-2 text-center py-0"
                                >
                                    <small class="my-auto">Details</small>
                                </button>
                            </div>
                        </div>

                        <!--  activity details -->
                        <ActivityDetails
                            v-if="(currentShowedActivityDetailsID == order.id)"
                            :order="order"
                        />
                    </div>
                </div>

                <!--  -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, defineProps, ref } from 'vue';
import Helpers from "@/Helpers.js";
import StrHelper from "@/helpers/StrHelper.js";
import DateHelper from "@/helpers/DateHelper.js";
import ActivityDetails from './ActivityDetails.vue';
defineComponent({ ActivityDetails });
const props = defineProps({
    activities: Array
});

const currentShowedActivityDetailsID = ref("");

function toggleActivityDetails(order) {
    currentShowedActivityDetailsID.value = currentShowedActivityDetailsID.value == order.id ? "" : order.id;
}

function isActivityTypeIsSendingOrRequesting(order) {
    const type = order.type.toUpperCase();
    return type?.includes(`SENDING`) || type?.includes(`REQUESTING`);
}


function test(event) {
    console.log(event);
}

</script>

<style scoped>
.contact-icon-size {
    width: 40px;
    height: 40px;
}
.wrapper-activity:hover {
    background-color: rgba(108, 117, 125, 0.15) !important;
}
</style>
