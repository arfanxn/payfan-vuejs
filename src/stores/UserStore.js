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
        self: Object
    }),
    getters: {
        "self/joined_at": (state) => {
            let crtdAt = new Date(state.self.created_at);
            return crtdAt.toLocaleDateString();
        }
    },
    actions: {
        async fetchSelf() {
            try {
                const response = await axios.get('/api/user/self');
                this.self = await response.data.data;
                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
});