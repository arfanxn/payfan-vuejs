import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactsStore = defineStore("contacts", {
    state: () => ({
        "pagination/data": [],
        "pagination/meta": [],
        top: [],
        all: [],
        blocked: [],
    }),

    actions: {
        async fetch(options = {}) {
            const {
                order_by,
                favorited,
                blocked,
                added,

                // parameters for handling pagination/paginator
                per_page,
                page,
            } = options;
            try {
                const response = await axios.get("/api/user/self/contacts", {
                    params: {
                        order_by: order_by ? order_by : "last_transaction:desc",
                        favorited: favorited ? 0 : 1,
                        blocked: blocked ? 1 : 0,
                        added: added ? 0 : 1,

                        // parameters for handling pagination/paginator
                        per_page: per_page ? per_page : 30,
                        page,
                    }
                });

                if (response.status == 200) {
                    this["pagination/data"] = response.data.contacts.data;

                    if (delete response.data.contacts.data)
                        this["pagination/meta"] = response.data.contacts;
                }

                return response;
            } catch (error) {
                return error.response;
            }
        },

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