import axios from "axios";
import {
    useWalletStore
} from "./WalletStore.js";
import {
    useUserSettingStore
} from "./UserSettingStore.js";

import {
    defineStore
} from "pinia";

export const useAuthUserStore = defineStore("authUser", {
    state: () => ({
        data: {},
        "isLoggedIn": Boolean,
    }),
    getters: {
        'wallet': () => {
            return useWalletStore();
        },
        'setting': () => {
            return useUserSettingStore();
        }
    },
    actions: {
        async fetch() {
            try {
                const response = await axios.get('/api/user/self');
                const data = await response.data.data;

                this.data = data;

                if ("setting" in data)
                    this.setting.fill(data["setting"]);
                if ("settings" in data)
                    this.setting.fill(data["settings"]);

                if ("wallet" in data)
                    this.wallet.fill(data["wallet"]);

                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
});