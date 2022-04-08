import {
    defineStore
} from "pinia";

export const useWalletStore = defineStore("wallet", {
    state: () => ({
        data: {},
    }),
    getters: {

    },
    actions: {
        fill(wallet) {
            this.data = wallet;
        },
    }
});