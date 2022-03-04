import axios from "axios";
import {
    useContactStore
} from "../stores/ContactStore";
const ContactStore = useContactStore();

export default class ContactService {
    static async topContacts() {
        try {
            const response = await axios.get("/api/user/self/contacts/top-contacts");

            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async lastTransactionDetail(contactID) {
        try {
            return await axios.get(`/api/user/self/contact/${contactID}/last-transaction`);
        } catch (error) {
            return error.response;
        }
    }

    static async addOrRm(userID) {
        try {
            return await axios.post(`/api/user/self/contact/add-or-rm/user/${userID}`);
        } catch (error) {
            return error.response;
        }
    }

    static async block(contactID) {
        try {
            return await axios.post(`/api/user/self/contact/${contactID}/block`);
        } catch (error) {
            return error.response;
        }
    }

    static async toggleFavorite(contactID) {
        try {
            const response = await axios.get(`/api/user/self/contact/${contactID}/toggle-favorite`);
            if (response) {
                ContactStore.toggleFavorite(contactID)
            }
            return response;
        } catch (error) {
            return error.response;
        }
    }
}