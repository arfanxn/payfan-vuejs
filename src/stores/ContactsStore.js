// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactsStore = defineStore("contacts", {
    state: () => ({
        top: [],
        all: [],
        blocked: [],
    }),

    actions: {
        remove(contactIDtoRemove) {
            this.top = this.top.filter(contact => contact['id'] != contactIDtoRemove);
        },
        block(contactIDtoBlock) {
            this.top = this.top.filter(contact => {
                if (contact['id'] == contactIDtoBlock) {
                    this.blocked.push(contact)
                    console.log(() => this.blocked);
                }
                return contact['id'] != contactIDtoBlock
            });
        },
        toggleFavorite(contactID) {
            this.top = this.top.map(contact => {
                if (contact['id'] == contactID) {
                    return Object.assign(contact, {
                        status: contact['status'] == "FAVORITED" ? "ADDED" : "FAVORITED"
                    });
                }
                return contact
            })
        }
    }
});