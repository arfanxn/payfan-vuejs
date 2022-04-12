<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-notification-settings" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-notification-settings">Launch demo modal</button>

        <!-- Modal -->
        <div class="modal fade" id="modal-notification-settings" tabindex="-1" aria-labelledby="modal-contant-detail"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column">
                        <h5 class="text-center fw-bold mb-4">Notifications Settings</h5>

                        <div>
                            <span class="text-secondary">We'll let you know when you</span>
                            <div
                                class="cursor-pointer py-4 border-bottom border-secondary d-flex justify-content-between">
                                <span>Make a payment</span>

                                <div class="form-check form-switch">
                                    <input disabled class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                                        checked />
                                </div>
                            </div>
                            <div
                                class="cursor-pointer py-4 border-bottom border-secondary d-flex justify-content-between">
                                <span>Request a payment</span>
                                <div class="form-check form-switch">
                                    <input @change="updateNotificationSettings({
                                        request_notification: !AuthUserStore['setting']['data']['request_notification']
                                    })" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                                        :checked="AuthUserStore['setting']['data']['request_notification']" />
                                </div>
                            </div>
                            <div class="cursor-pointer py-4  d-flex justify-content-between">
                                <span>Receive a payment</span>

                                <div class="form-check form-switch">
                                    <input
                                        @change="updateNotificationSettings({ receive_notification: !AuthUserStore['setting']['data']['receive_notification'] })"
                                        class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                                        :checked="AuthUserStore['setting']['data']['receive_notification']" />
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
import { useAuthUserStore } from '../../../stores/auth/AuthUserStore';
import UserService from '../../../services/UserService'
import SwalPlugin from '../../../plugins/SwalPlugin';
const AuthUserStore = useAuthUserStore();

const updateNotificationSettings = async ({ request_notification, receive_notification }) => {
    UserService.updateNotificationSettings({ request_notification, receive_notification }).then(r => {
        if (r.status == 200) {
            if (request_notification) {
                AuthUserStore['setting']['data']['request_notification'] = request_notification;
            } else if (receive_notification) {
                AuthUserStore['setting']['data']['receive_notification'] = receive_notification;
            }

            if ("message" in r.data && typeof r.data["message"] == "object") {
                const messageKeys = Object.keys(r.data.message);
                SwalPlugin.alertPositioned({ title: r.data.message[messageKeys[0]], icon: "success", timer: 1500 });
            }
        }
    });
};




</script>
