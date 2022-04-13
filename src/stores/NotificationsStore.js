// import axios from "axios";
import {
    defineStore
} from "pinia";
import DateHelper from "@/helpers/DateHelper";
import Helpers from "../Helpers";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        "latest/meta": {},
        "latest/data": [],
        "private/alreadyLoadedPageList" : [] ,  // page [1,2,3] 
        "private/isLoading" : false , 
        "private/showBadge" : false ,  
    }),
    getters: {
        "latest/total_unread": (state) => {
            if ( typeof state["latest/meta"]['total_unread'] == "undefined") return 0 ; 

            return parseInt(state["latest/meta"]['total_unread']) ; 
        },
    },
    actions: {
        pushLatest(notificationPagination, additionals = null) {
            if (this["private/alreadyLoadedPageList"]?.indexOf(notificationPagination['current_page']) <= -1) { // if page isn't already loaded 
                    const notificationsDataLength = notificationPagination.data.length;
                    const middleIndexOfNotificationsData = notificationsDataLength > 0 ? Math.floor(notificationsDataLength / 2) : null;
                    const isAlreadyInsertedToNotificationsStore = () => {
                        if (!notificationsDataLength)
                            return false

                        return this['latest/data']
                            .filter(notification => notification.id ==
                                notificationPagination['data'][middleIndexOfNotificationsData]["id"])
                            .length;
                    }

                    if (notificationsDataLength && !isAlreadyInsertedToNotificationsStore()) {
                        this['latest/data'].push(...notificationPagination.data); // why the state is named "latest/data" because "latest" is mean notification ordered by latest datetime and data is meaning to the notificationPagination data it self

                        this['latest/meta'] = Object.keys(notificationPagination).filter(key => // the "this['latest/meta']" is a state for storing the latest notification meta data , like an pagination information and other additional things

                        key !== 'data').reduce((obj, key) => { // filter/remove/delete the object key "data" (because the key "data" is already added to the "this['latest/data']" state)
                        obj[key] = notificationPagination[key];
                        return obj; // return to this['latest/meta'] (replacing this['latest/meta'] property)
                        }, {});

                        if (typeof additionals == "object") { // if "additionals" parameter is provided and type is object then add "additionals" to object this['latest/meta'] 
                            Object.keys(additionals || {}).forEach(key => {
                                this['latest/meta'][key] = additionals[key];
                            })
                        }

                        this["private/alreadyLoadedPageList"]?.push(notificationPagination['current_page']);
                        if (notificationPagination['total_unread'] > 0) this["private/showBadge"] = true;
                    }
            }
        },

        realtimeLatest(notification) {
            const isDuplicate = // check for duplicates in notifications
                (this["latest/data"]
                .filter(notificationFromState => notificationFromState.id == notification.id)
                    .length);

            if (!isDuplicate) {
                this['latest/data'].unshift(notification);
                this["latest/meta"]['total_unread'] =
                    Helpers.tap(this["latest/meta"]['total_unread'] , total_unread => {
                        if (typeof total_unread == "undefined") {
                            return 1; 
                        } else if (typeof parseInt(total_unread) == "number") {
                            return parseInt(total_unread) + 1 ; 
                        }
                });
                this["private/showBadge"] = true;
            }
        },

        markAsRead(notificationID) {
            this['latest/data'] = this['latest/data'].map(notification => {
                if (notification.id == notificationID) {
                    notification.read_at = DateHelper.nowISOstring();
                    this['latest/meta'][`total_unread`] =
                        parseInt(
                            this['latest/meta'][`total_unread`]) - 1; // subtract the total unread notifications

                    return notification;
                } else return notification;
            });
        },

        markAsUnread(notificationID) {
            this['latest/data'] = this['latest/data'].map(notification => {
                if (notification.id == notificationID) {
                    notification.read_at = null;
                    this['latest/meta'][`total_unread`] =
                        parseInt(
                            this['latest/meta'][`total_unread`]) + 1; // add the total unread notifications

                    return notification;
                } else return notification;
            });
        }
    }
});