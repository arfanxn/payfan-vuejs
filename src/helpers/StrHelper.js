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

    censor() {
        this.string = "*".repeat(this.string).length;
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
}