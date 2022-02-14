<template>
    <div class>
        <div class="ps-5 pe-4 pb-3">
            <div
                @click="blockedContacts"
                class="cursor-pointer py-4 border-bottom border-secondary"
            >
                <h5>Blocked contacts</h5>
                <div class="d-flex justify-content-between">
                    <span class="text-secondary">Review and edit the people you previosly blocked.</span>
                    <a class="cursor-pointer hover-underline text-dark fw-bold">
                        <ChevronRightIcon width="18" height="18" />
                    </a>
                </div>
            </div>
            <div
                @click="notificationSettings"
                class="cursor-pointer py-4 border-bottom border-secondary"
            >
                <h5>Notifications</h5>
                <div class="d-flex justify-content-between">
                    <span class="text-secondary">Email notifications preference settings</span>
                    <a class="cursor-pointer hover-underline text-dark fw-bold">
                        <ChevronRightIcon width="18" height="18" />
                    </a>
                </div>
            </div>
        </div>

        <BlockedContactsModal />
        <NotificationSettingsModal />
    </div>
</template>

<script setup>
import { defineComponent } from "vue";
import ChevronRightIcon from "@/components/Icons/ChevronRight.vue";
import BlockedContactsModal from "@/components/Bootstrap5/Modals/BlockedContactsModal.vue";
import NotificationSettingsModal from "@/components/Bootstrap5/Modals/NotificationSettingsModal.vue";
import Helpers from "../../Helpers";
defineComponent({ ChevronRightIcon, BlockedContactsModal, NotificationSettingsModal });

function blockedContacts() {
    Helpers.triggerBSModal(`#btn-modal-blocked-contacts`);
}

function notificationSettings() {
    Helpers.triggerBSModal(`#btn-modal-notification-settings`);
}

</script>