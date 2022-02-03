<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-contact-detail"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-contact-detail"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-contact-detail"
            tabindex="-1"
            aria-labelledby="modal-contant-detail"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column">
                        <div class="d-flex justify-content-center">
                            <div
                                class="contact-icon-size shadow bg-warning rounded-circle d-flex justify-content-center"
                            >
                                <span class="fw-bold my-auto">AM</span>
                            </div>
                            <div class="ps-3 my-auto text-secondary">
                                <span class="d-block m-0 p-0 fw-bold">Alif Maulana</span>
                                <a class="cursor-pointer d-flex text-dark m-0 p-0">
                                    <StarIcon width="20" height="20" />
                                    <span class="ms-1 text-secondary my-auto">Mark as a top contact</span>
                                </a>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center mt-4">
                            <a
                                class="cursor-pointer btn-send-n-req text-white rounded-pill mx-1 px-5 py-2"
                            >
                                <span class="fw-bold">Send</span>
                            </a>
                            <a
                                class="cursor-pointer btn-send-n-req text-white rounded-pill mx-1 px-5 py-2"
                            >
                                <span class="fw-bold">Request</span>
                            </a>
                        </div>

                        <div class="mt-4">
                            <small class="fw-bold text-secondary mb-3 d-block">Recent activity</small>
                            <div
                                class="bg-light cursor-pointer w-100 d-flex justify-content-between p-4"
                            >
                                <div class="d-flex">
                                    <small class="me-5">6 Dec</small>
                                    <div class="d-flex flex-column">
                                        <span class>Send Money</span>
                                        <small class="text-secondary mb-2">"Thanks mate!"</small>
                                        <a class="cursor-pointer hover-underline text-navy">
                                            <small>Repeat this transaction</small>
                                        </a>
                                    </div>
                                </div>
                                <div class="text-secondary">-&nbsp;100,00&nbsp;$&nbsp;USD</div>
                            </div>
                        </div>

                        <div class="text-center mt-4">
                            <a
                                class="cursor-pointer text-navy hover-underline mb-2"
                            >Remove this contact</a>
                            <br />
                            <a class="cursor-pointer text-navy hover-underline">Block this contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineComponent } from "@vue/runtime-core";
import StarIcon from "@/components/Icons/StarIcon.vue";

defineComponent({ StarIcon })

</script>

<style scoped>
.contact-icon-size {
    width: 75px;
    height: 75px;
}
.btn-send-n-req {
    background-color: #0070ba !important;
}
.btn-send-n-req:hover {
    background-color: #003087 !important;
}
</style>