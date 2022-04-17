import axios from "axios";
import  {useAuthUserStore} from "@/stores/auth/AuthUserStore.js" ; 

export default class AuthService {
    static async login(email, password, code = null) {
        try {
            const response = await axios.post("/api/users/login", {
                email,
                password,
                code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async register(fullname, email, password, password_confirmation, code) {
        try {
            const response = await axios.post("/api/users/register", {
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

    static async passwordRecovery({
        email , code , security_answer,new_password , new_password_confirmation
    }) {
        let data = {} ;
        if (typeof security_answer == "undefined" || security_answer.length == 0) 
            data = {
                email , code , new_password  , new_password_confirmation
            };
        if (typeof code == "undefined" || code.length == 0) 
            data = {
                email , security_answer,new_password  , new_password_confirmation
            }; 
        
        try {
            const response = await axios.post("/api/users/password/recovery", data);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async createVerificationCode(email = null , {
        reason,
        notifiable_name,
    } = {}) {    
        try {
            const response = await axios.post("/api/users/verification-code/create", {
                email, reason , notifiable_name
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async verifyVerificationCode(email, otp, hashed_code = null) {
        try {
            const response = await axios.post("/api/users/verification-code/verify", {
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

            if (response.status == 200) {
                const AuthUserStore = useAuthUserStore() ; 
                AuthUserStore['isLoggedIn'] = false ;
            }

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
}