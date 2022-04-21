<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-contact-detail" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-contact-detail">Launch demo modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-contact-detail" tabindex="-1" aria-labelledby="modal-contant-detail"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button id="btn-close-modal-contact-detail" type="button" class="btn-close"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column">
                        <div class="d-flex justify-content-center">

                            <UserAvatar :user="contact?.user" style="width:75px; height:75px" />

                            <div class="ps-3 my-auto text-secondary">
                                <span class="d-block m-0 p-0 fw-bold">{{ props?.contact?.user?.name }}</span>
                                <a @click.prevent="toggleFavorite" class="cursor-pointer d-flex text-dark m-0 p-0">
                                    <StarIcon :class="`${state.contact.isFavorited ? 'text-success' : 'text-dark'}`"
                                        width="20" height="20" />
                                    <span class="ms-1 text-secondary my-auto">{{
                                        state.contact.isFavorited ? `Remove
                                                                            from top contact` : 'Mark as a top contact'
                                    }}</span>
                                </a>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center mt-4">
                            <a @click="showCreatePaymentModal(`SEND`)"
                                class="cursor-pointer btn-send-n-req text-white rounded-pill mx-1 px-5 py-2">
                                <span class="fw-bold">Send</span>
                            </a>
                            <a @click="showCreatePaymentModal(`REQUEST`)"
                                class="cursor-pointer btn-send-n-req text-white rounded-pill mx-1 px-5 py-2">
                                <span class="fw-bold">Request</span>
                            </a>
                        </div>

                        <div class="mt-4">
                            <small class="fw-bold text-secondary mb-3 d-block">Recent activity</small>
                            <div class="bg-light cursor-pointer w-100 d-flex justify-content-between p-4"
                                v-if="`id` in state.contact.last_transaction.data">
                                <div class="d-flex">
                                    <small class="me-5">
                                        {{
                                            Helpers.tap(new Date(state.contact.last_transaction.data['created_at']),
                                                created_at => `${created_at.getDate()} ${DateHelper
                                                    .numericMonthtoString(created_at.getMonth(), 3)}`)
                                        }}
                                    </small>
                                    <div class="d-flex flex-column">
                                        <span class>{{ state.contact.last_transaction.data?.type }}</span>
                                        <small class="text-secondary mb-2">
                                            {{
                                                state.contact.last_transaction.showFullNote ?
                                                    state.contact.last_transaction.data?.note
                                                    : state.contact.last_transaction?.data?.note?.slice(0, 120)
                                            }}
                                            <a @click.prevent="state.contact.last_transaction.showFullNote = true"
                                                v-if="state.contact.last_transaction.data?.note?.length >= (120) && !state.contact.last_transaction.showFullNote"
                                                class="cursor-pointer text-navy hover-underline d-block">See more. .
                                                .</a>
                                            <a @click.prevent="state.contact.last_transaction.showFullNote = false"
                                                v-if="state.contact.last_transaction.showFullNote"
                                                class="cursor-pointer text-navy hover-underline d-block">Show less</a>
                                        </small>
                                        <!-- <a v-if="state.contact.last_transaction.data['type']?.toUpperCase().includes('SEND')"
                                            @click="handleSendPayment({
                                                amount: state.contact.last_transaction.data['amount'],
                                                name: contact?.user?.name,
                                                note: state.contact.last_transaction.data['amount'],
                                                wallet: props?.contact?.user?.wallet?.address,
                                                amountInUSD: StrHelper
                                                    .make(state.contact.last_transaction.data['amount'])
                                                    .toUSD().get()
                                                ,
                                            })" class="cursor-pointer hover-underline text-navy">
                                            <small>Repeat this transaction</small>
                                        </a>
                                        <a v-else class="cursor-pointer hover-underline text-navy" @click="handleMakeRequestPayment({
                                            amount: state.contact.last_transaction.data['amount'],
                                            name: contact?.user?.name,
                                            note: state.contact.last_transaction.data['amount'],
                                            wallet: props?.contact?.user?.wallet?.address
                                        })">
                                            <small>Repeat this request</small>
                                        </a> -->
                                        <router-link
                                            @click="() => Helpers.closeBSModal(`#btn-close-modal-contact-detail`)" :to="{
                                                path: `/activity`, query: {
                                                    keyword: state.contact.last_transaction.data['id']
                                                }
                                            }" class="btn btn-outline-secondary rounded-pill py-0 px-0">
                                            <small class="fs-7 fw-bold mx-0">Details</small>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="text-dark">
                                    <span>&nbsp;{{
                                        state.contact.last_transaction.data?.amount
                                    }}&nbsp;$&nbsp;USD</span>
                                </div>
                            </div>
                            <div v-else class="text-center text-secondary">
                                <span>No recent activity with {{ props?.contact?.user?.name }}</span>
                            </div>
                        </div>

                        <div class="text-center mt-4">
                            <a class="cursor-pointer text-navy hover-underline mb-2"
                                @click="removeUserFromContacts">Remove this
                                contact</a>
                            <br />
                            <a @click.prevent="blockContact" class="cursor-pointer text-navy hover-underline">Block this
                                contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <CreatePaymentModal
            @nextClicked="(obj) => state.createPaymentModal.currentStep == `SEND` ? handleSendPayment(obj) : handleMakeRequestPayment(obj)"
            :user="props.contact?.user">
            <template #nextButtonText>{{
                state.createPaymentModal.currentStep == `SEND` ? `Send payment` : `Make a
            request` }}</template>
        </CreatePaymentModal>
    </teleport>
</template>

<script setup>
import { defineComponent, defineProps, watch, reactive } from "vue";
import ContactsService from "@/services/ContactsService";
import DateHelper from "@/helpers/DateHelper.js";
// import StrHelper from "@/helpers/StrHelper.js";
import StarIcon from "@/components/Icons/StarIcon.vue";
import SwalPlugin from "../../../plugins/SwalPlugin";
import Helpers from "../../../Helpers";
import { useContactsStore } from '@/stores/ContactsStore.js';
import { handleSendPayment, handleMakeRequestPayment } from "../../../services/functions";
import { useSearchPeoplesStore } from "../../../stores/SearchPeoplesStore";
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
import CreatePaymentModal from "./CreatePaymentModal.vue";
const SearchPeoplesStore = useSearchPeoplesStore();
const ContactsStore = useContactsStore();
defineComponent({
    StarIcon,
    CreatePaymentModal
});
const props = defineProps({
    contact: {},
});
const state = reactive({
    contact: {
        isFavorited: !Boolean,
        last_transaction: {
            data: {},
            showFullNote: false
        },
    },
    createPaymentModal: {
        currentStep: null,
    }
})

watch(() => props.contact, async contactValue => {
    if ("id" in contactValue) {
        const response = await ContactsService.lastTransactionDetail(contactValue['id'])
        if (response.status == 200) {
            state.contact.last_transaction.data = await response.data.last_transaction || {};
            state.contact.isFavorited = props.contact["status"] == "FAVORITED" ? true : false;
        }
    }
})

function toggleFavorite() {
    const contact = props.contact;
    ContactsService.toggleFavorite(contact['id']).then(r => {
        if (r.data.message.toLowerCase()?.includes("add") /*favorited*/) {
            SwalPlugin.alertPositioned({
                title: `contact "${contact['user']['name']}" <strong>marked</strong> as top contacts`
            });
            state.contact.isFavorited = true;
        } else if (r.data.message.toLowerCase()?.includes("remove")/*unfavorited*/) {
            SwalPlugin.alertPositioned({
                title: `contact "${contact['user']['name']}" <strong>removed</strong> from top contacts`
            })
            state.contact.isFavorited = false;
        }
    });
}

function removeUserFromContacts() {
    SwalPlugin.confirm({
        title: `Remove contact`,
        html: `Remove "${props.contact['user']['name']}" from contacts ?`,
        icon: `warning`,
    }).then(result => {
        if (result.isConfirmed) {
            ContactsService.addOrRm(props.contact['user']['id']).then(r => {
                const rMsg = r.data.message.toLowerCase();
                if (rMsg.includes("remove") || rMsg.includes("delete")) {
                    ContactsStore.remove(props.contact['id']);
                    Helpers.closeBSModal(`#btn-close-modal-contact-detail`)

                    // refresh the peoples store
                    SearchPeoplesStore.fetch(SearchPeoplesStore.keyword)
                        .then(() => {
                            SwalPlugin.alertPositioned({
                                title: `"${props.contact['user']['name']}" removed from contacts`,
                                icon: "success",
                                timer: 1000,
                            })
                        });
                }
            });
        }
    });
}

function blockContact() {
    SwalPlugin.confirm({
        title: `Block contact`,
        html: `Block ${props.contact['user']['name']} ?`,
        icon: `question`,
    }).then(result => {
        if (result.isConfirmed) {
            ContactsService.block(props.contact['id']).then(() => {
                Helpers.closeBSModal(`#btn-close-modal-contact-detail`);
                SwalPlugin.alertPositioned({
                    title: `"${props.contact['user']['name']}" has been blocked`,
                    icon: "info",
                    timer: 1000,
                })

                // refresh the peoples store
                SearchPeoplesStore.fetch(SearchPeoplesStore.keyword);

            });
        }
    });
}

function showCreatePaymentModal(operation) {
    state.createPaymentModal.currentStep = operation.toUpperCase();
    Helpers.triggerBSModal(`#btn-modal-create-payment`);
}
</script>

<style scoped>
.btn-send-n-req {
    background-color: #0070ba !important;
}

.btn-send-n-req:hover {
    background-color: #003087 !important;
}
</style>