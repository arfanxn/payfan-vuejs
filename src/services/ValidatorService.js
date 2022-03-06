import axios from "axios";

export default class ValidatorService {
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

    static async isEmailTakenExceptSelf(email, responseShouldBoolean = true) {
        try {
            console.log(email);
            if (!email) throw Error("Email is required");

            const response = await axios.post('/api/validator/users/email/is-taken/except/self', {
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

    static isImage(img) {
        const allowedExts = ['.jpg', '.jpeg', '.bmp', '.gif', '.png'];
        return allowedExts.some(el => img.endsWith(el));
    }

    static isCurrency(amount) {
        // Regex description => Allows a decimal, requires commas
        return !!amount.match(/(?=.*\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?(\.\d{1,2})?$/g);
    }

}