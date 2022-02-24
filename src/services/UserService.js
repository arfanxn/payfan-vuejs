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

    static async updateSecurityQuestion(question, answer, code) {
        try {
            const response = await axios.patch("/api/user/settings/security-question/self", {
                security_question: question,
                security_answer: answer,
                code
            })

            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async updateProfilePict(formDataOrBLOB) {
        try {
            let response;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            if (formDataOrBLOB instanceof FormData) {
                response = await axios.post("/api/user/profile-pict/self", formDataOrBLOB, config);
            } else {
                response = await axios.post("/api/user/profile-pict/self", {
                    profile_pict: formDataOrBLOB
                }, config);
            }
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async disableOrEnable2FA(code) {
        try {
            const response = axios.patch("/api/user/settings/2fa/self", {
                code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}