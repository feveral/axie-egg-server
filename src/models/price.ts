

class Price {

    private _valueNumber: number = 0;
    private _valueString: string;

    constructor (value: string | number) {
        if (typeof(value) === 'string') {
            this._valueString = value;
            this._valueNumber = this._toNumber(value);
        } else {
            this._valueNumber = value;
            this._valueString = this._toString(value);
        }
    }
    
    public get valueString() : string {
        return this._valueString
    }

    public get valueNumber() : number {
        return this._valueNumber
    }
    
    private _toNumber (value: string) {
        let num = 0;
        const reversedValue = this._reverseString(value)
        for (let i = 0; i < reversedValue.length; i++) {
            num += parseInt(reversedValue[i])*Math.pow(10, i - 18);
        }
        return num;
    }

    private _toString (value: number) {
        let str = Math.floor(value).toString();
        for (let i = 0; i < 18; i++) {
            value *= 10;
            str += Math.floor(value) % 10;
        }
        str = str.replace(/^0+/, '');
        return str;
    }

    private _reverseString(str: string) {
        const splitString = str.split("");
        const reverseArray = splitString.reverse();
        const joinArray = reverseArray.join("");
        return joinArray;
    }
}

export default Price;