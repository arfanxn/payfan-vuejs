<template>
    <div class="dropdown text-break">
        <a @click="NotificationsStore['private/showBadge'] = false/* if clicked hide unread notifications badge */"
            href="#" class="nav-link fw-bold fs-6 d-flex position-relative p-0 mt-2 mx-1 " data-bs-toggle="dropdown"
            aria-expanded="false">
            <img class="nav-link-icon my-auto invert-100" src="@/assets/icons/bell-ring.png" alt="Notifications" />
            <span v-show="NotificationsStore['private/showBadge']"
                class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </a>
        <ul class="dropdown-menu pt-0 notification-dropdown-menu overflow-auto"
            @click="e => e.stopPropagation() /* preventing closing dropdown when clicked  */"
            @scroll="loadMoreNotifications" aria-labelledby="dropdownMenuButton">
            <li class="dropdown-header-wrapper d-flex py-1 justify-content-center">
                <h5 class="dropdown-header text-white fs-6 fw-bold my-auto">
                    Notifications
                    <span>
                        ({{
                            parseInt(NotificationsStore['latest/total_unread']) >= 100 ?
                                "100+" : NotificationsStore['latest/total_unread']
                        }})
                    </span>
                </h5>
            </li>
            <li class="text-wrap cursor-pointer my-1"
                v-for="(notification, index ) in NotificationsStore[`latest/data`]" :key="index">
                <a class="dropdown-item text-start text-wrap py-2">
                    <div :class="notification.read_at ? `text-secondary` : `text-dark`">
                        <h6 class="fw-bold my-0 py-0">{{ notification.data.header }}</h6>
                        <span class="text-break" href="#">{{ notification.data.body }}</span>
                    </div>

                    <button @click="notificationAction(notification, notification.data.action)" v-if="notification.data?.action &&
                        (notification.data?.action?.link || notification.data?.action?.url || notification.data?.action?.endpoint)
                    " class="me-1 btn btn-outline-primary mt-1 py-0 px-2 rounded-pill fs-7 d-inline-block">
                        {{ notification.data.action.text }}</button>
                    <button @click.stop="toogleNotificationRead($event, notification)"
                        class="btn btn-outline-primary mt-1 py-0 px-2 rounded-pill fs-7 d-inline-block">{{
                            notification.read_at ? "Mark as unread" : "Mark as read"
                        }}</button>
                </a>
            </li>

            <!-- blank li for adding a range between  -->
            <li class="pb-5 pt-3 mb-5 bg-transparent text-center fw-bold">{{
                isLoadNotification ? `Loading more
                            notifications....` : `No more notifications yet.`
            }}</li>
        </ul>
    </div>
    <!--  -->
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useNotificationsStore } from '../../stores/NotificationsStore';
import router from '../../router';
import NotificationService from "@/services/NotificationService.js";
import StrHelper from "@/helpers/StrHelper.js";
// import { useAuthUserStore } from "../../stores/auth/AuthUserStore.js"
// const AuthUserStore = useAuthUserStore();
StrHelper;
const NotificationsStore = useNotificationsStore()

const isLoadNotification = ref(false);

onMounted(() => {
    /*  NotificationService.latest().then(r => {
           if (r.status == 200) {
               notification.alreadyLoadedPageList.push(r.data.notifications['current_page']);
               NotificationsStore.pushLatest(r.data.notifications);
               if (NotificationsStore['latest/total_unread'] > 0)
                   NotificationsStore['private/showBadge'] = true;
   
           }
       })     */

    // listen live notifications
    // window.Echo.private('users.' + AuthUserStore.data['id']).notification(notification => {
    //     NotificationsStore.realtimeLatest(notification);
    // } /**/);
})

watch(() => NotificationsStore['latest/total_unread'], (newValue, oldValue) => {
    newValue = parseInt(newValue);
    oldValue = parseInt(oldValue);

    if (newValue > oldValue)
        NotificationsStore['private/showBadge'] = true;
    else if (newValue === 0)
        NotificationsStore['private/showBadge'] = false;

});

function notificationAction(notification, action) {
    const goToAction = () => {
        if (typeof action.query == "object") {
            if ("payment_id" in action.query) {
                return router.push("/activity/?keyword=" + action.query.payment_id);
            }
        }

        if (action.url || action.link) return router.push((action.url || action.link) /**/);
    }

    if (!notification.read_at) // if not read mark as read
        NotificationService.markAsRead(notification.id).then(r => {
            if (r.status == 200) NotificationsStore.markAsRead(notification.id);
            goToAction();
        });
    else goToAction()
}

function loadMoreNotifications(event) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) { // if scrolled to bottom 
        isLoadNotification.value = true;
        const nextPage = NotificationsStore['latest/meta']["current_page"] + 1;
        if (NotificationsStore['private/alreadyLoadedPageList'].indexOf(nextPage) <= -1) { // if next page isn't loaded 
            NotificationService.latest(nextPage).then(r => {
                if (r.status == 200) {
                    NotificationsStore.pushLatest(r.data.notifications);
                    isLoadNotification.value = false;
                }
            });
        }
    }
}

const toogleNotificationRead = (event, notification) => {
    // disable button for a few seconds after click
    event.target.disabled = true;
    setTimeout(() => (event.target.disabled = false), 3000);

    if (notification.read_at) {
        NotificationService.markAsUnread(notification.id).then(r => {
            if (r.status == 200) {
                NotificationsStore.markAsUnread(notification.id);
            }
        });
    } else {
        NotificationService.markAsRead(notification.id).then(r => {
            if (r.status == 200) {
                NotificationsStore.markAsRead(notification.id)
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