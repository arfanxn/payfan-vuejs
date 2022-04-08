// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useSearchPeoplesStore = defineStore("searchPeoples", {
    state: () => ({
        "results/users": [],
        "results/contacts": [],
        "results/toggleShow": false,
        searchKeyword: '',
    }),
    getters: {
        userIDsInContacts: state => state["results/contacts"].map(contact => contact['user']['id']),
    },
    actions: {
        refillResults({
            users,
            contacts
        }) {
            this["results/users"] = users;
            this["results/contacts"] = contacts;
        },
        moveContactToUser(contactID) {
            const contact = this["results/contacts"].filter(contact => contact['id'] == contactID);
            console.log(contact);
            this["results/users"].unshift(contact['user']);
        }
    }
});