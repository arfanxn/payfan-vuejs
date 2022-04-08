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
        refreshResults({
            users,
            contacts
        }) {
            this["results/users"] = users;
            this["results/contacts"] = contacts;
        },
        moveContactToResultsUsers(contactID) {
            const contact = this["results/contacts"].filter(contact => contact['id'] == contactID);
            console.log(contact);
            this["results/users"].unshift(contact['user']);
        },

        moveUserToResultsContacts(contactID) {
            //  not implemented yet and not completely created
            const contact = this["results/contacts"].filter(contact => contact['id'] == contactID);
            console.log(contact);
            this["results/users"].unshift(contact['user']);
        }
    }
});