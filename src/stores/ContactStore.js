// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactStore = defineStore("contact", {
    state: () => ({
        topContacts: [],
        all: [],
        blocked: [],
    }),

    actions: {
        remove(contactIDtoRemove) {
            this.topContacts = this.topContacts.filter(contact => contact['id'] != contactIDtoRemove);
        },
        block(contactIDtoBlock) {
            this.topContacts = this.topContacts.filter(contact => {
                if (contact['id'] == contactIDtoBlock) {
                    this.blocked.push(contact)
                    console.log(() => this.blocked);
                }
                return contact['id'] != contactIDtoBlock
            });
        },
        toggleFavorite(contactID) {
            this.topContacts = this.topContacts.map(contact => {
                if (contact['id'] == contactID) {
                    return Object.assign(contact, {
                        status: contact['status'] == "FAVORITED" ? "ADDED" : "FAVORITED"
                    });
                }
                return contact
            })

            console.log(this.topContacts);
        }
    }
});