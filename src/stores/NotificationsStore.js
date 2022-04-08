// import axios from "axios";
import {
    defineStore
} from "pinia";
import DateHelper from "@/helpers/DateHelper";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        "latest/meta": {},
        "latest/data": [],
    }),
    getters: {
        "latest/total_unread": (state) => state["latest/meta"]['total_unread'],
    },
    actions: {
        pushLatest(notificationPagination, additionals = null) {
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
        },

        realtimeLatest(notification) {
            const isDuplicate = // check for duplicates in notifications
                (this["latest/data"].filter(notificationFromState => notificationFromState.id == notification.id).length) <= 0;

            if (isDuplicate) {
                this['latest/data'].unshift(notification);
                this["latest/meta"]['total_unread'] += 1;
            }
        },

        markAsRead(notificationID) {
            this['latest/data'] = this['latest/data'].map(notification => {
                if (notification.id == notificationID) {
                    notification.read_at = DateHelper.now();
                    this['latest/meta'][`total_unread`] =
                        parseInt(
                            this['latest/meta'][`total_unread`]) - 1; // subtract the total unread notifications
                    console.log(
                        this['latest/meta'][`total_unread`]);
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

                    console.log(
                        this['latest/meta'][`total_unread`]);
                    return notification;
                } else return notification;
            });
        }
    }
});