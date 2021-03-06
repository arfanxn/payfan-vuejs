import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactsStore = defineStore("contacts", {
    state: () => ({
        "pagination/data": [],
        "pagination/meta": [],
    }),

    getters  : {
        "pagination/data/blockedContacts": (state) => {
            return state["pagination/data"].filter(contact => contact.status?.toUpperCase().includes("BLOCK") ) ; 
        }
    } ,

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
                        order_by: order_by ? order_by : "updated_at:desc",
                        // favorited: typeof favorited !== "undefined"  ? 0 : 1,
                        // blocked: typeof blocked !== "undefined" ? 1 : 0,
                        // added: typeof added !== "undefined" ? 0 : 1,
                        favorited,
                        blocked,
                        added,

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
            this["pagination/data"] = this["pagination/data"].filter(contact => contact['id'] != contactIDtoRemove);
        },
        toggleFavorite(contactID) {
            this["pagination/data"] = this["pagination/data"].map(contact => {
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