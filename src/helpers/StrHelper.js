export default class StrHelper {
    constructor(string) {
        this.string = string;
    }

    static make(string) {
        return new StrHelper(string);
    }

    get() {
        return this.string;
    }

    censor(ifStringNotProvidedUseCensorLength = null) {
        //  if string is provided get the length of the string and repeat the censor by string length  
        this.string = (!ifStringNotProvidedUseCensorLength && this.string.length) ?
            "*".repeat(this.string.length) :
            // otherwise if string isn't provided get the censor length from method argument
            "*".repeat(ifStringNotProvidedUseCensorLength);
        return this;
    }

    addSpaceBeforeCapitals() {
        this.string = this.string.replace(/([A-Z])/g, ' $1').trim()
        return this;
    }

    removeBackslashes() {
        this.string = this.string.replace(/\\/g, "");
        return this;

    }

    firstCharEachWord() {
        this.string = this.string.split(" ").map(word => word.charAt(0)).join("");
        return this;
    }
}