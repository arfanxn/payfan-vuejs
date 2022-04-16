import axios from "axios";
import {useWalletStore} from "@/stores/auth/WalletStore.js" ; 

export default class TransactionService {
    static async sendPayment({
        amount,
        note,
        to_wallet,
        charge,
        code
    }) {
        try {
            const response = await axios.post("/api/user/self/transaction/send-payment", {
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

    static async makeRequestPayment({
        amount,
        to_wallet,
        note
    }) {
        try {
            const response = await axios.post("/api/user/self/transaction/request-payment/make", {
                amount,
                note,
                to_wallet,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async approveRequestPayment(payment, code) {
        try {
            const paymentID = payment.id;

            const response = await axios.patch(`/api/user/self/transaction/request-payment/payment/${paymentID}/approve`, {
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

    static async rejectRequestPayment(payment) {
        try {
            const paymentID = typeof payment === "string" ? payment : payment.id;

            const response = await axios.patch(`/api/user/self/transaction/request-payment/payment/${paymentID}/reject`);
            return response;
        } catch (error) {
            return error.response;
        }
    }
}