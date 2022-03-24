class DateHelper {
    numericMonthtoString(month, length = Infinity) {
        if (typeof month != "number" || (month < 1 || month > 12)) {
            throw Error("Month must be a number 1 - 12");
        }

        const monthNames = [
            "January", "February", 'March', 'April', "May", "July",
            "June", "August", "September", "October", 'November', 'December'
        ];

        return (monthNames[month]).slice(0, length)
    }

    now(format = null) {
        if (format == "carbon" || !format) {
            const now = new Date();
            let carbonFormat = `${now.getFullYear()}-${now.getMonth().length < 2 ?
                "0" + now.getMonth() : now.getMonth()}-${now.getDate().length < 2 ?
                "0" + now.getDate() : now.getDate()} ${now.getHours().length < 2 ?
                "0" + now.getHours() : now.getHours()}:${now.getMinutes().length < 2 ?
                "0" + now.getMinutes() : now.getMinutes()}:${now.getSeconds()}`;
            return carbonFormat;
        }
    }
}

export default new DateHelper;