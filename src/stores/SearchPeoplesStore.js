import axios from "axios";
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
        async fetch (keyword) {
            try {
                const response = await axios.get(`/api/peoples/search`, {
                    params: {
                        keyword
                    }
                });
                
                if (response.status == 200) {
                    this["results/users"] = response.data.users;
                    this["results/contacts"] = response.data.contacts;
                }
                
                return response;
            } catch (error) {
                return error.response;
            }
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