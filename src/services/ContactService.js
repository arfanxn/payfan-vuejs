import axios from "axios";

export default class ContactService {
    static async whereNotBlocked() {
        try {
            const response = await axios.get("/api/user/self/contacts/top-contacts");

            return response;
        } catch (error) {
            return error.response;
        }
    }
}