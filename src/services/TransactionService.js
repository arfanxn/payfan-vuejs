import axios from "axios";

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
            return response;
        } catch (error) {
            return error.response;
        }
    }
}