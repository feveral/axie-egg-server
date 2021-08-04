enum AxieStage {
    egg = 'egg',
    adult = 'adult',
}

class Axie {

    private _id: string;
    private _name: string;
    private _image: string;
    private _price: string;
    private _priceUSD: string;
    private _stage: AxieStage;
    private _parents: [Axie, Axie] = [null, null];
    
    constructor (id: string, name: string, image: string, price: string, priceUSD: string, stage: AxieStage) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._price = price;
        this._priceUSD = priceUSD;
        this._stage = stage;
    }

    public get id() { return this._id; }
    public get name() { return this._name; }
    public get image() { return this._image; }
    public get price() { return this._price; }
    public get priceUSD() { return this._priceUSD; }
    public get stage() { return this._stage; }
    public get parents() { return this._parents; }

    public set parents(parents: [Axie, Axie]) {
        this._parents = parents;
    }
}

export {Axie, AxieStage};