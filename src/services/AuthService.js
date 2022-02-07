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

    static async register(fullname, email, password, password_confirmation, code) {
        try {
            const response = await axios.post("/api/user/register", {
                name: fullname,
                fullname: fullname, // just in case if the server only accept fullname  
                email,
                password,
                password_confirmation,
                code: code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async createVerificationCode(email) {
        try {
            const response = await axios.post("/api/user/verification-code/create", {
                email,
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async verifyVerificationCode(email, otp, hashed_code = null) {
        try {
            const response = await axios.post("/api/user/verification-code/verify", {
                email,
                otp,
                hashed_code
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

    static async refresh() {
        try {
            const response = await axios.get("/api/user/auth/refresh");
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