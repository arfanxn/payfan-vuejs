import axios from "axios";
// import {
//     watch
// } from "vue";
import {
    defineStore
} from "pinia";

export const useUserStore = defineStore("user", {


    state: () => ({
        self: {},
        "self/settings": {},
        "self/isLoggedIn": Boolean,
    }),
    actions: {
        async fetchSelf() {
            try {
                const response = await axios.get('/api/user/self');
                const data = await response.data.data;
                this.self = data;
                if ("settings" in data)
                    this["self/settings"] = data["settings"];
                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
});