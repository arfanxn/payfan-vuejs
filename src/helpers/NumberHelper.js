class NumberHelper {
    static addDecimals( subjectDecimal , valueToAdd) {
        const strSubjectDecimal = subjectDecimal.toString().replace(/[,]/g , "") ;
        const strValueToAdd = valueToAdd.toString().replace(/[,]/g , "") ; 

        subjectDecimal = parseFloat(strSubjectDecimal/**/); 
        valueToAdd = parseFloat(strValueToAdd/**/);

        let result =  Math.round((subjectDecimal + valueToAdd) * 1e12) / 1e12;

        const highestFloatingPointLength =
            strSubjectDecimal.split(".")[1].length > strValueToAdd.split(".")[1].length 
            ?  strSubjectDecimal.split(".")[1].length : strValueToAdd.split(".")[1].length ;

        return parseFloat(/**/result.toFixed(highestFloatingPointLength)/**/);
    }

    static subDecimals( subjectDecimal , valueToSub) {
        const strSubjectDecimal = subjectDecimal.toString().replace(/[,]/g , "") ;
        const strValueToSub = valueToSub.toString().replace(/[,]/g , "") ;
        
        subjectDecimal = parseFloat(strSubjectDecimal/**/); 
        valueToSub = parseFloat(strValueToSub/**/);

        let result =  (/**/( subjectDecimal * 10 ) - (valueToSub * 10)/**/) / 10 ;
        
        const highestFloatingPointLength =
            strSubjectDecimal.split(".")[1].length > strValueToSub.split(".")[1].length 
            ?  strSubjectDecimal.split(".")[1].length : strValueToSub.split(".")[1].length ;

        return parseFloat(/**/result.toFixed(highestFloatingPointLength)/**/);
    }
}

export default NumberHelper;