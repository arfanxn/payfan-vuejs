class DateHelper {
    numericMonthtoString(month, length = Infinity) {
        if (typeof month != "number" || (month < 1 || month > 12)) {
            throw Error("Month must be a number 1 - 12");
        }

        const monthNames = [
            "January", "February", 'March', 'April', "May", "July",
            "June", "August", "September", "October", 'November', 'December'
        ];

        return (monthNames[month - 1]).slice(0, length)
    }
}

export default new DateHelper;