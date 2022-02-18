import axios from "axios";

export default class UserService {
    static async updateEmail(email, code) {
        try {
            const response = await axios.patch("/api/user/email/self", {
                email,
                code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async updateFullname(fullname) {
        try {
            const response = await axios.patch("/api/user/name/self", {
                name: fullname
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async updatePassword(current_password, password, password_confirmation, code) {
        try {
            const response = await axios.patch("/api/user/password/self", {
                current_password,
                password,
                password_confirmation,
                code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}