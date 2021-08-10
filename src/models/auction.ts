import Price from "./price";

class AxieAuction {
    public _startingPrice: Price;
    public _endingPrice: Price;
    public _startingTimestamp: number;
    public _endingTimestamp: number;

    setTimestamp (startingTimestamp: string, endingTimestamp: string) {
        this._startingTimestamp = parseInt(startingTimestamp);
        this._endingTimestamp = parseInt(endingTimestamp);
    }

    setPrice (startingPrice: string, endingPrice: string) {
        this._startingPrice = new Price(startingPrice);
        this._endingPrice = new Price(endingPrice);
    }
    
    public get startingTimestamp() : number {
        return this._startingTimestamp
    }

    public get endingTimestamp() : number {
        return this._endingTimestamp
    }

    public get startingPrice() : Price {
        return this._startingPrice
    }

    public get endingPrice() : Price {
        return this._endingPrice
    }

    public get duration () : number {
        return this._endingTimestamp - this._startingTimestamp
    }
    
    //TODO: not yet test
    public get currentPrice() : Price {
        return new Price((Date.now() / 1000 - this._startingTimestamp) /  (this._endingTimestamp - this._startingTimestamp));
    }

    json () {
        return {
            startingPrice: this._startingPrice,
        }
    }
}

export default AxieAuction;