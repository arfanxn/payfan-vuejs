import axios from "axios";

export default class UserService {
    static async updateEmail(email, code) {
        try {
            const response = await axios.patch("/api/user/self/email", {
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
            const response = await axios.patch("/api/user/self/name", {
                name: fullname
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async updatePassword(current_password, password, password_confirmation, code) {
        try {
            const response = await axios.patch("/api/user/self/password", {
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
            const response = await axios.patch("/api/user/self/settings/security-question", {
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
                response = await axios.post("/api/user/self/profile-pict", formDataOrBLOB, config);
            } else {
                response = await axios.post("/api/user/self/profile-pict", {
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
            const response = axios.patch("/api/user/self/settings/2fa", {
                code
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async updateNotificationSettings({
        request_notification,
        receive_notification
    }) {
        try {
            const response = axios.patch("/api/user/self/settings/notifications", {
                request_notification,
                receive_notification
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}