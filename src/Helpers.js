export default class Helpers {
    static errorMessageAccessor(data, errorName = null) {
        if (errorName) {
            if (errorName in data) {
                return Array.isArray(data[errorName]) ?
                    data[errorName][0] : data[errorName];
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