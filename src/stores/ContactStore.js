// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactStore = defineStore("contact", {
    state: () => ({
        topContacts: Array,
        all: Array,
        added: Array,
        favorited: Array,
        blocked: Array
    }),

    actions: {
        removeContact(contactIDtoRemove) {
            this.topContacts = this.topContacts.filter(contact => contact['id'] != contactIDtoRemove);
        }
    }
});