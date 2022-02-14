<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button
            id="btn-modal-notification-settings"
            type="button"
            class="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modal-notification-settings"
        >Launch demo modal</button>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal-notification-settings"
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
                        <h5 class="text-center mb-4">Notifications Settings</h5>

                        <div>
                            <span class="text-secondary">We'll let you know when you</span>
                            <div
                                class="cursor-pointer py-4 border-bottom border-secondary d-flex justify-content-between"
                            >
                                <span>Make a payment</span>

                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        checked
                                    />
                                </div>
                            </div>
                            <div
                                class="cursor-pointer py-4 border-bottom border-secondary d-flex justify-content-between"
                            >
                                <span>Request a payment</span>
                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                    />
                                </div>
                            </div>
                            <div
                                class="cursor-pointer py-4 border-bottom border-secondary d-flex justify-content-between"
                            >
                                <span>Receive a payment</span>

                                <div class="form-check form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        checked
                                    />
                                </div>
                            </div>
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

