import MarketFetcher from "../libs/marketFetcher";

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
    private _matronId: string;
    private _sireId: string;
    private _matron: Axie = null;
    private _sire: Axie = null;
    
    constructor (id: string, name: string, image: string, price: string, priceUSD: string, stage: AxieStage, matronId: string, sireId: string) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._price = price;
        this._priceUSD = priceUSD;
        this._stage = stage;
        this._matronId = matronId;
        this._sireId = sireId;
    }

    public get id() { return this._id; }
    public get name() { return this._name; }
    public get image() { return this._image; }
    public get price() { return this._price; }
    public get priceUSD() { return this._priceUSD; }
    public get stage() { return this._stage; }
    public get matronId() { return this._matronId; }
    public get sireId() { return this._sireId; }

    public async getParents(): Promise<Axie[]> {
        if (this._matron === null || this._sire === null) {
            this._matron = await MarketFetcher.getAxie(this._matronId);
            this._sire = await MarketFetcher.getAxie(this._sireId);
        }
        return [this._matron, this._sire]
    }
}

export {Axie, AxieStage};