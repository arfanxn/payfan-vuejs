export default class Helpers {
    static errorMessageAccessor(data, errorName = null) {
        if (typeof errorName == "string") {
            if (errorName in data) {
                return Array.isArray(data[errorName]) ?
                    data[errorName][0] : data[errorName];
            } else if ("errors" in data) {
                return Array.isArray(data.errors[errorName]) ?
                    data.errors[errorName][0] : (data.errors[errorName] || null);
            } else {
                return null;
            }
        } else {
            if (data.error) {
                return data.error;
            } else if (data.errors) {
                return data.errors;
            } else {
                return "Something went wrong";
            }
        }
    }

    static ENV(key) {
        return process.env[key] ? process.env[key] : process.env[`VUE_${key}`];
    }

    static triggerBSModal(...key) {
        document.querySelectorAll(key).forEach(el => el.click());
    }
}