// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        "latest/pagintion": {},
        "latest/data": {},
    }),

    actions: {
        remove(contactIDtoRemove) {
            this.topContacts = this.topContacts.filter(contact => contact['id'] != contactIDtoRemove);
        },
    }
});