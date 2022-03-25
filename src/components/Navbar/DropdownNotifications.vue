<template>
    <div class="dropdown text-break">
        <a
            href="#"
            class="nav-link fw-bold fs-6 d-flex"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                class="nav-link-icon my-auto"
                src="@/assets/icons/bell-ring.png"
                alt="Notifications"
            />
        </a>
        <ul
            class="dropdown-menu pt-0 notification-dropdown-menu overflow-auto"
            @click="e => e.stopPropagation() /* preventing close dropdown when clicked  */"
            @scroll="loadMoreNotifications"
            aria-labelledby="dropdownMenuButton"
        >
            <li class="dropdown-header-wrapper d-flex py-1 justify-content-center">
                <h5 class="dropdown-header text-white fs-6 fw-bold my-auto">
                    Notifications
                    <span>
                        ({{
                            parseInt(NotificationStore['latest/total_unread']) >= 100 ?
                                "100+" : NotificationStore['latest/total_unread']
                        }})
                    </span>
                </h5>
            </li>
            <li
                class="text-wrap cursor-pointer my-1"
                v-for="(notification, index ) in NotificationStore[`latest/data`]"
                :key="index"
            >
                <a class="dropdown-item text-start text-wrap py-2">
                    <div :class="notification.read_at ? `text-secondary` : `text-dark`">
                        <h6 class="fw-bold my-0 py-0">
                            {{
                                StrHelper.make(notification.type.substring(notification.type.lastIndexOf("\\") + 1)).removeBackslashes().addSpaceBeforeCapitals().get().replace(/(notificatio[n|ns]+)/ig, "")
                            }}
                        </h6>
                        <span class="text-break" href="#">{{ notification.data.text }}</span>
                    </div>

                    <button
                        v-if="notification.data?.link && notification.data?.action"
                        class="d-flex justify-content-start me-1 btn btn-outline-primary mt-1 py-0 px-2 rounded-pill"
                    >
                        <small class="my-auto">{{ notification.data.action }}</small>
                    </button>
                    <button
                        @click="toogleNotificationRead(notification)"
                        class="d-flex justify-content-start btn btn-outline-primary mt-1 py-0 px-2 rounded-pill"
                    >
                        <small
                            class="my-auto"
                        >{{ notification.read_at ? "Mark as unread" : "Mark as read" }}</small>
                    </button>
                </a>
            </li>

            <!-- blank li for adding a range between  -->
            <li
                class="pb-5 pt-3 mb-5 bg-transparent text-center fw-bold"
            >{{ notification.isLoadingMore ? `Loading more notifications....` : `No more notificitaions yet.` }}</li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, reactive, } from 'vue';
import { useNotificationStore } from '../../stores/NotificationStore';
import NotificationService from "@/services/NotificationService.js";
import StrHelper from "@/helpers/StrHelper.js"
const NotificationStore = useNotificationStore()
const notification = reactive({
    alreadyLoadedPageList: [],
    isLoadingMore: false,
});

onMounted(() => {
    NotificationService.latest().then(r => {
        if (r.status == 200) {
            notification.alreadyLoadedPageList.push(r.data.notifications['current_page']);
            NotificationStore.refillLatest(r.data.notifications);

        }
    })
})

function loadMoreNotifications(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) { // if scrolled to bottom 
        notification.isLoadingMore = true;
        const nextPage = NotificationStore['latest/meta']["current_page"] + 1;
        if (notification.alreadyLoadedPageList.indexOf(nextPage) <= -1) { // if next page isn't loaded 
            NotificationService.latest(nextPage).then(r => {
                if (r.status == 200) {
                    const lastIndexOfNotificationsData = r.data['notifications']['data'].length - 1;
                    const isAlreadyInsertedInNotificationStore = NotificationStore['latest/data']
                        .filter(notification => notification.id ==
                            r.data['notifications']['data'][lastIndexOfNotificationsData]["id"])
                        .length;

                    if (!isAlreadyInsertedInNotificationStore) {
                        NotificationStore.refillLatest(r.data.notifications);
                        notification.alreadyLoadedPageList.push(r.data.notifications['current_page']);
                        notification.isLoadingMore = false;
                    }
                }
            });
        }
    }
}

const toogleNotificationRead = (notification) => {
    if (notification.read_at) {
        NotificationService.markAsUnread(notification.id).then(r => {
            if (r.status == 200) {
                NotificationStore.markAsUnread(notification.id);
            }
        });
    } else {
        NotificationService.markAsRead(notification.id).then(r => {
            if (r.status == 200) {
                NotificationStore.markAsRead(notification.id)
            }
        });
    }
}

</script>

<style scoped>
.dropdown-header-wrapper {
    background-color: #0070ba !important;
}

.notification-dropdown-menu {
    width: 300px;
    height: 100vh;
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 100% !important;
}

.dropdown-item:active {
    background: #fff !important;
}

.nav-link-icon {
    width: 25px;
    height: 25px;
    color: white;
}
</style>