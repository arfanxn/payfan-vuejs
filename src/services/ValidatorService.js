import axios from "axios";

export default class ValidatorService {
    static statusTextIsVerifyCodeMiddleware(statusText) {
        statusText = statusText.toLowerCase();
        return (statusText == "verifyverificationcodemiddleware has fails!" || statusText == "verifyverificationcodemiddleware");
    }

    static async isEmailTaken(email, responseShouldBoolean = true) {
        try {
            if (!email) throw Error("Email is required");

            const response = await axios.post('/api/validator/users/email/is-taken', {
                email
            });
            return responseShouldBoolean ? response.data.valid : response;
        } catch (error) {
            return responseShouldBoolean ? false : error.response || error;
        }
    }

    static async passwordCheck(password, responseShouldBoolean = true) {
        try {
            if (!password) throw Error("Password is required");
            const response = await axios.post('/api/validator/user/password/check/self', {
                password
            });
            return responseShouldBoolean ? response.data.valid : response;
        } catch (error) {
            return responseShouldBoolean ? false : error.response || error;
        }
    }
}