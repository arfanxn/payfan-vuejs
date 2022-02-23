import axios from "axios";
import {
    defineStore
} from "pinia";

export const useUserStore = defineStore("user", {
    // getters: {
    //     userCredentials(state) {
    //     },
    // },

    state: () => ({
        self: Object,
        "self/settings": Object
    }),
    getters: {
        "self/joined_at": (state) => {
            let crtdAt = new Date(state.self.created_at);
            return crtdAt.toLocaleDateString();
        },
    },
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