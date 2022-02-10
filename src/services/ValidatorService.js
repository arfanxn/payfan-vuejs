import axios from "axios";

export default class ValidatorService {
    static statusTextIsVerifyCodeMiddleware(statusText) {
        statusText = statusText.toLowerCase();
        return (statusText == "verifyverificationcodemiddleware has fails!" || statusText == "verifyverificationcodemiddleware");
    }

    static async isEmailTaken(email, responseShouldBoolean = true) {
        try {
            if (!email) throw Error("Email is required");
            console.log(responseShouldBoolean);
            const response = await axios.post('/api/validator/users/email/is-taken', {
                email
            });
            return responseShouldBoolean ? response.data.valid : response;
        } catch (error) {
            return responseShouldBoolean ? false : error.response || error;
        }
    }
}