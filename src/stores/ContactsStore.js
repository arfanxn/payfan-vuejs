// import axios from "axios";
import {
    defineStore
} from "pinia";

export const useContactStore = defineStore("contact", {
    state: () => ({
        allAndNotBlocked: Array,
        all: Array,
        added: Array,
        favorited: Array,
        blocked: Array
    }),

    actions: {
        searchContactsWhereNotBlocked({
            keyword
        }) {
            keyword;
        }
    }
});