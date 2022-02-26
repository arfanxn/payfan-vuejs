import axios from "axios";

export default class ContactService {
    static async whereNotBlocked() {
        try {
            const response = await axios.get("/api/user/self/contacts/where-not-blocked");

            return response;
        } catch (error) {
            return error.response;
        }
    }
}