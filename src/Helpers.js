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
    static async closeBSModal(key) {
        return await new Promise(resolve => {
            const closeBtn = document.querySelector(key);
            closeBtn.addEventListener("click", () => {
                closeBtn.removeEventListener(closeBtn, this);
                resolve()
            });
            closeBtn.click();
        });

    }

    static arrayContains(array, contains, caseSensitivy = false) {
        let isContains = false;
        array.forEach(elem => {
            if (isContains) return;

            if (elem.toLowerCase() == contains.toLowerCase() && !caseSensitivy) isContains = true
            else if (caseSensitivy) isContains = array.includes(contains);
            else isContains = false;
        })
        return isContains;
    }

    static strCensor(numberOrStr) {
        if (typeof numberOrStr == "string") {
            return "*".repeat(numberOrStr.length);
        } else if (typeof numberOrStr != "string") {
            return "*".repeat(numberOrStr);
        }
    }

    static getFirstCharEachWord(string) {
        return string.split(" ").map(word => word.charAt(0));
    }

    static tap($variable, callback) {
        return callback($variable);
    }
}