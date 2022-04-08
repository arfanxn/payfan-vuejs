class DateHelper {
    numericMonthtoString(month, length = Infinity) {
        if (typeof month != "number" || (month < 0 || month > 11)) {
            throw Error("Month must be a number 0 - 11");
        }

        const monthNames = [
            "January", "February", 'March', 'April', "May", "July",
            "June", "August", "September", "October", 'November', 'December'
        ];

        return (monthNames[month]).slice(0, length)
    }

    nowISOstring() {
        var date = new Date(); // get current datetime
        return date.toISOString(); //return as  ISOstring format -> "2011-12-19T15:28:46.493Z"
    }
}

export default new DateHelper;