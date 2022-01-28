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

    static async register(fullname, email, password, password_confirmation) {
        try {
            const response = await axios.post("/api/user/register", {
                name: fullname,
                fullname: fullname, // just in case if the server only accept fullname  
                email,
                password,
                password_confirmation
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

    static async userProfile() {
        try {
            const response = await axios.get("/api/user/profile");
            return response;
        } catch (error) {
            return error.response;
        }
    }
}