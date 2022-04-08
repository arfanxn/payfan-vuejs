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
                            <div class="fw-bold my-auto m-0 p-0">
                                <!-- if the status still pending make the text amount color gray (ambigous) -->
                                <p
                                    class="text-secondary"
                                    v-if="order.status?.toUpperCase()?.includes(`PENDING`)"
                                >{{ StrHelper.make(order.amount).toUSD(false).get() }}&nbsp;$</p>
                                <!-- if the status completed and order type is either SEND or REQUESTED  make the text amount color red (subtraction) -->
                                <p
                                    class="text-danger"
                                    v-else-if="
                                    (order.type?.toUpperCase()?.includes(`SEND`)
                                        || order.type?.toUpperCase()?.includes(`REQUESTED`))
                                    && order.status?.toUpperCase()?.includes(`COMPLETE`)"
                                >- {{ StrHelper.make(order.amount).toUSD(false).get() }}&nbsp;$</p>
                                <!-- if the status completed and order type is either REQUESTING or RECEIVINF or GIFT  make the text amount color green (addaction) -->
                                <p
                                    class="text-success"
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTING`)
                                    || order.type?.toUpperCase()?.includes(`RECEIV`)
                                    || order.type?.toUpperCase()?.includes(`GIFT`))
                                    && order.status?.toUpperCase()?.includes(`COMPLETE`)"
                                >+ {{ StrHelper.make(order.amount).toUSD(false).get() }}&nbsp;$</p>
                                <!-- if the status FAILED or REJECTED make the text amount color danger  -->
                                <p
                                    class="text-danger"
                                    v-else-if="order.status?.toUpperCase()?.includes(`FAIL`)
                                    || order.status?.toUpperCase()?.includes(`REJECT`)"
                                >x {{ StrHelper.make(order.amount).toUSD(false).get() }}&nbsp;$</p>
                            </div>
                        </div>

                        <small class="d-block">
                            {{
                                Helpers.tap(new Date(order.started_at), date =>
                                    date.getDate() + " " + DateHelper.numericMonthtoString(date.getMonth())
                                )
                            }}
                        </small>
                        <small class="d-block">{{ order.type }}</small>
                        <small class="d-block">{{ `"${order.note.substring(0, 100)}"` }}</small>

                        <div class="d-flex justify-content-between mt-2">
                            <div class>
                                <!-- show this if order type is send money -->
                                <button
                                    v-if="(order.type?.toUpperCase()?.includes(`SEND`))"
                                    @click.stop="handleSendPayment({
                                        amount: order.amount,
                                        name: order.to_wallet.user.name,
                                        note: order.note,
                                        wallet: order.to_wallet.address,
                                        amountInUSD: StrHelper.make(order.amount).toUSD().get()
                                    })"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                >
                                    <small class="my-auto">Repeat this transaction</small>
                                </button>

                                <!-- show this if order type is requesting and order status is pending and waiting for approval from the related order wallet (to_wallet)-->
                                <button
                                    @click.stop="handleMakeRequestPayment({
                                        amount: order.amount,
                                        wallet: order.to_wallet.address,
                                        note: order.note,
                                        name: order.to_wallet.user.name,
                                        amountInUSD: StrHelper.make(order.amount).toUSD().get()
                                    })"
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTING`))
                                    && !(order.status.toUpperCase().includes(`PENDING`))"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                >
                                    <small class="my-auto">Repeat this request</small>
                                </button>

                                <!-- show this if order type is requested and order status is pending and not approved or rejected yet -->
                                <div
                                    v-else-if="(order.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                    (order.status?.toUpperCase()?.includes(`PENDING`))"
                                    class="d-flex justify-content-between"
                                >
                                    <button
                                        @click.stop="approveRequestMoney(order)"
                                        class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0"
                                    >
                                        <small class="my-auto">Approve request</small>
                                    </button>
                                    <button
                                        @click.stop="rejectRequestMoney(order)"
                                        class="btn btn-outline-danger d-flex rounded-pill ms-1 fw-bold px-3 text-center py-0"
                                    >
                                        <small class="my-auto">Reject request</small>
                                    </button>
                                </div>
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
                                <small
                                    v-else-if="(order.status?.toUpperCase()?.includes(`FAIL`))"
                                    class="my-auto fw-bold text-center py-0 text-danger"
                                >Order or transaction is Failed</small>
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
        <!--  -->
    </div>
</template>

<script setup>
import { defineComponent, defineProps, ref } from 'vue';
import { handleSendPayment, handleMakeRequestPayment } from '@/services/functions.js';
import Helpers from "@/Helpers.js";
import StrHelper from "@/helpers/StrHelper.js";
import DateHelper from "@/helpers/DateHelper.js";
import ActivityDetails from './ActivityDetails.vue';
import TransactionService from '../../services/TransactionService';
import SwalPlugin from '../../plugins/SwalPlugin';
import AuthService from '../../services/AuthService';
import { useActivitiesStore } from '../../stores/ActivitiesStore';
const ActivitiesStore = useActivitiesStore();
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


function approveRequestMoney(order) {
    const amountInUSD = StrHelper.make(order.amount).toUSD().get();

    SwalPlugin.confirm({
        title: `Confirm your payment`,
        html: `Approve request from "${order.from_wallet.user.name}" ? <br>
        Requested amount ${amountInUSD}`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            AuthService.createVerificationCode().then(() => {
                SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                    return await TransactionService.approveRequestMoney(order, verificationCode)
                        .then(r => {
                            if (r.status == 200) {
                                SwalPlugin.autoCloseAlert('Request approved successfully', `Request from "${order.from_wallet.user.name}", amount 
                                    ${amountInUSD} has been approved.`, "success", 2000);
                                ActivitiesStore.fetch();
                            } else if ("error_message" in r.data) {
                                SwalPlugin.autoCloseAlert(r.data.error_message, null, "error", 2000);
                            }
                            return r;
                        })
                })
            })
        }
    });
}


function rejectRequestMoney(order) {
    const amountInUSD = StrHelper.make(order.amount).toUSD().get();

    SwalPlugin.confirm({
        title: `Reject pending request`,
        html: `Reject request from "${order.from_wallet.user.name}" ? <br>
        Requested amount ${amountInUSD}`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            TransactionService.rejectRequestMoney(order)
                .then(r => {
                    if (r.status == 200) {
                        SwalPlugin.autoCloseAlert('Request rejected successfully', `Request from "${order.from_wallet.user.name}", amount ${amountInUSD} has been rejected.`, "success", 2000);
                        ActivitiesStore.fetch();
                    } else if ("error_message" in r.data) {
                        SwalPlugin.autoCloseAlert(r.data.error_message, null, "error", 2000);
                    }
                    return r;
                })
        }
    });
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
