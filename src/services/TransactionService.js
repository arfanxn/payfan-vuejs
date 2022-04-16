import axios from "axios";
import {useWalletStore} from "@/stores/auth/WalletStore.js" ; 

export default class TransactionService {
    static async sendMoney({
        amount,
        note,
        to_wallet,
        charge,
        code
    }) {
        try {
            const response = await axios.post("/api/user/self/transaction/send-money", {
                amount,
                note,
                to_wallet,
                charge,
                code
            });

            if (response.status == 200) {
                const WalletStore = useWalletStore();
                WalletStore.subtractBalance(amount) ; 
            }

            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async makeRequestMoney({
        amount,
        to_wallet,
        note
    }) {
        try {
            const response = await axios.post("/api/user/self/transaction/request-money/make", {
                amount,
                note,
                to_wallet,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async approveRequestMoney(payment, code) {
        try {
            const paymentID = payment.id;

            const response = await axios.patch(`/api/user/self/transaction/request-money/payment/${paymentID}/approve`, {
                code: code,
            });

            if (response.status == 200) {
                const WalletStore = useWalletStore();
                WalletStore.subtractBalance(payment.amount) ; 
            }

            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async rejectRequestMoney(payment) {
        try {
            const paymentID = typeof payment === "string" ? payment : payment.id;

            const response = await axios.patch(`/api/user/self/transaction/request-money/payment/${paymentID}/reject`);
            return response;
        } catch (error) {
            return error.response;
        }
    }
}