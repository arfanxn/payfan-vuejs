import axios from "axios";

export default class AuthService {
    static async login(email, password) {
        try {
            const response = await axios.post("/api/user/login", {
                email,
                password
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async logout() {
        try {
            const response = await axios.get("/api/user/logout");
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async check() {
        try {
            const response = await axios.get("/api/user/auth/check");
            return response;
        } catch (error) {
            return error.response;
        }
    }
}