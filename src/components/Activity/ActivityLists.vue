<template>
    <div class>
        <div v-for="(payment, index) in props.activities" :key="index">
            <div class="d-flex justify-content-between wrapper-activity cursor-pointer py-3 px-4"
                @click="toggleActivityDetails(payment)">
                <div class="d-flex text-dark w-100">
                    <!--  -->
                    <UserAvatar
                        v-if="payment.type?.toUpperCase()?.includes(`SENDING`) || payment.type?.toUpperCase()?.includes(`REQUESTING`)"
                        :user="payment.to_wallet.user" style="width:40px ; height:40px" />
                    <UserAvatar v-else :user="payment.from_wallet.user" style="width:40px ; height:40px" />

                    <!--  -->
                    <div class="ms-3 text-secondary w-100">
                        <div class="d-flex justify-content-between">
                            <p class="fw-bold my-auto text-dark">
                                {{
                                    payment.type?.toUpperCase()?.includes(`SENDING`) ||
                                        payment.type?.toUpperCase()?.includes(`REQUESTING`)
                                        ? payment.to_wallet.user.name
                                        : payment.from_wallet.user.name
                                }}
                            </p>
                            <!--  -->
                            <div class="fw-bold my-auto m-0 p-0">
                                <!-- if the status still pending make the text amount color gray (ambigous) -->
                                <p class="text-secondary" v-if="payment.status?.toUpperCase()?.includes(`PENDING`)">{{
                                    StrHelper.make(payment.amount).toUSD(false).get()
                                }}&nbsp;$</p>
                                <!-- if the status completed and payment type is either SEND or REQUESTED  make the text amount color red (subtraction) -->
                                <p class="text-danger" v-else-if="
                                (payment.type?.toUpperCase()?.includes(`SEND`)
                                    || payment.type?.toUpperCase()?.includes(`REQUESTED`))
                                && payment.status?.toUpperCase()?.includes(`COMPLETE`)">- {{
        StrHelper.make(payment.amount).toUSD(false).get()
    }}&nbsp;$</p>
                                <!-- if the status completed and payment type is either REQUESTING or RECEIVINF or GIFT  make the text amount color green (addaction) -->
                                <p class="text-success" v-else-if="(payment.type?.toUpperCase()?.includes(`REQUESTING`)
                                || payment.type?.toUpperCase()?.includes(`RECEIV`)
                                || payment.type?.toUpperCase()?.includes(`GIFT`))
                                && payment.status?.toUpperCase()?.includes(`COMPLETE`)">+ {{
        StrHelper.make(payment.amount).toUSD(false).get()
    }}&nbsp;$</p>
                                <!-- if the status FAILED or REJECTED make the text amount color danger  -->
                                <p class="text-danger" v-else-if="payment.status?.toUpperCase()?.includes(`FAIL`)
                                || payment.status?.toUpperCase()?.includes(`REJECT`)">x {{
        StrHelper.make(payment.amount).toUSD(false).get()
    }}&nbsp;$</p>
                            </div>
                        </div>

                        <small class="d-block">
                            {{
                                Helpers.tap(new Date(payment.started_at), date =>
                                    date.getDate() + " " + DateHelper.numericMonthtoString(date.getMonth())
                                )
                            }}
                        </small>
                        <small class="d-block">{{ payment.type }}</small>
                        <small class="d-block">{{ `"${payment.note.substring(0, 100)}"` }}</small>

                        <div class="d-flex justify-content-between mt-2">
                            <div class>
                                <!-- show this if payment type is send money -->
                                <button v-if="(payment.type?.toUpperCase()?.includes(`SEND`))" @click.stop="handleSendPayment({
                                    amount: payment.amount,
                                    name: payment.to_wallet.user.name,
                                    note: payment.note,
                                    wallet: payment.to_wallet.address,
                                    amountInUSD: StrHelper.make(payment.amount).toUSD().get()
                                })" class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0">
                                    <small class="my-auto">Repeat this transaction</small>
                                </button>

                                <!-- show this if payment type is requesting and payment status is pending and waiting for approval from the related payment wallet (to_wallet)-->
                                <button @click.stop="handleMakeRequestPayment({
                                    amount: payment.amount,
                                    wallet: payment.to_wallet.address,
                                    note: payment.note,
                                    name: payment.to_wallet.user.name,
                                    amountInUSD: StrHelper.make(payment.amount).toUSD().get()
                                })" v-else-if="(payment.type?.toUpperCase()?.includes(`REQUESTING`))
&& !(payment.status.toUpperCase().includes(`PENDING`))"
                                    class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0">
                                    <small class="my-auto">Repeat this request</small>
                                </button>

                                <!-- show this if payment type is requested and payment status is pending and not approved or rejected yet -->
                                <div v-else-if="(payment.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                (payment.status?.toUpperCase()?.includes(`PENDING`))"
                                    class="d-flex justify-content-between">
                                    <button @click.stop="approveRequestMoney(payment)"
                                        class="btn btn-outline-primary d-flex rounded-pill fw-bold px-3 text-center py-0">
                                        <small class="my-auto">Approve request</small>
                                    </button>
                                    <button @click.stop="rejectRequestMoney(payment)"
                                        class="btn btn-outline-danger d-flex rounded-pill ms-1 fw-bold px-3 text-center py-0">
                                        <small class="my-auto">Reject request</small>
                                    </button>
                                </div>
                                <!-- show this if payment type is requested and payment is already completed and already accepted/approved -->
                                <small v-else-if="(payment.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                (payment.status?.toUpperCase()?.includes(`COMPLETE`))"
                                    class="my-auto fw-bold text-center py-0 text-dark">
                                    Request from {{
                                        `"${payment.from_wallet.user.name?.substring(0, 20)}"`
                                    }} has been already approved by
                                    you
                                </small>

                                <!-- show this if payment type is requested and payment is rejected -->
                                <small v-else-if="(payment.type?.toUpperCase()?.includes(`REQUESTED`)) &&
                                (payment.status?.toUpperCase()?.includes(`REJECT`))"
                                    class="my-auto fw-bold text-center py-0 text-dark">
                                    Request from {{
                                        `"${payment.from_wallet.user.name?.substring(0, 20)}"`
                                    }} has been already rejected by
                                    you
                                </small>
                                <small v-else-if="(payment.status?.toUpperCase()?.includes(`FAIL`))"
                                    class="my-auto fw-bold text-center py-0 text-danger">Payment or transaction is
                                    Failed</small>
                            </div>

                            <div class>
                                <button
                                    class="btn btn-outline-secondary d-flex rounded-pill fw-bold px-2 text-center py-0">
                                    <small class="my-auto">Details</small>
                                </button>
                            </div>
                        </div>

                        <!--  activity details -->
                        <ActivityDetails v-if="(currentShowedActivityDetailsID == payment.id)" :payment="payment" />
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
import ActivityDetails from '@/components/Activity/ActivityDetails.vue';
import UserAvatar from '@/components/Avatar/UserAvatar.vue';
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

function toggleActivityDetails(payment) {
    currentShowedActivityDetailsID.value = currentShowedActivityDetailsID.value == payment.id ? "" : payment.id;
}

function approveRequestMoney(payment) {
    const amountInUSD = StrHelper.make(payment.amount).toUSD().get();

    SwalPlugin.confirm({
        title: `Confirm your payment`,
        html: `Approve request from "${payment.from_wallet.user.name}" ? <br>
        Requested amount ${amountInUSD}`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            AuthService.createVerificationCode().then(() => {
                SwalPlugin.verificationCode("Verify to continue", async verificationCode => {
                    return await TransactionService.approveRequestMoney(payment, verificationCode)
                        .then(r => {
                            if (r.status == 200) {
                                ActivitiesStore.fetch().then(() => {
                                    SwalPlugin.autoCloseAlert('Request approved successfully', `Request from "${payment.from_wallet.user.name}", amount 
                                    ${amountInUSD} has been approved.`, "success", 2000);
                                });
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


function rejectRequestMoney(payment) {
    const amountInUSD = StrHelper.make(payment.amount).toUSD().get();

    SwalPlugin.confirm({
        title: `Reject pending request`,
        html: `Reject request from "${payment.from_wallet.user.name}" ? <br>
        Requested amount ${amountInUSD}`,
        icon: 'question'
    }).then(result => {
        if (result.isConfirmed) {
            SwalPlugin.close();

            TransactionService.rejectRequestMoney(payment)
                .then(r => {
                    if (r.status == 200) {
                        ActivitiesStore.fetch().then(() => {
                            SwalPlugin.autoCloseAlert('Request rejected successfully', `Request from "${payment.from_wallet.user.name}", amount ${amountInUSD} has been rejected.`, "success", 3000);
                        });
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
