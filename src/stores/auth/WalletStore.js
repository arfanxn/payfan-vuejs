import {
    defineStore
} from "pinia";
import NumberHelper from "@/helpers/NumberHelper" ; 

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

        subtractBalance(amount) {
            amount = amount.toString().includes(".") ? amount : amount + ".00"; 
            this.data['balance'] =  NumberHelper.subDecimals(this.data['balance'] , amount ) ; 
        },
        addBalance(amount) {
            amount = amount.toString().includes(".") ? amount : amount + ".00"; 
            this.data['balance'] = NumberHelper.addDecimals(this.data['balance'] , amount ) ; 
        }, 
    }
});