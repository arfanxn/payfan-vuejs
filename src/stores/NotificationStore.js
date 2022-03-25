// import axios from "axios";
import {
    defineStore
} from "pinia";
import DateHelper from "@/helpers/DateHelper";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        "latest/meta": {},
        "latest/data": [],
    }),
    getters: {
        "latest/total_unread": (state) => state["latest/meta"]['total_unread'],
    },
    actions: {
        refillLatest(notificationPagination, additionals = null) {
            this['latest/data'].push(...notificationPagination.data); // why the state is named "latest/data" because "latest" is mean notification ordered by latest date and time and data is meaning to the notificationPagination data it self 
            this['latest/meta'] = Object.keys(notificationPagination).filter(key => // the "this['latest/meta']" is a state for storing the latest notification meta data , like an pagination information and other additional things
                key !== 'data').reduce((obj, key) => { // filter the object key "data" (because "data" is already added to the "this['latest/data']" object)
                obj[key] = notificationPagination[key];
                return obj;
            }, {});

            if (typeof additionals == "object") { // if additional parameter is provided and type is object  then add additional to object this['latest/meta'] 
                Object.keys(additionals || {}).forEach(key => {
                    this['latest/meta'][key] = additionals[key];
                })
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