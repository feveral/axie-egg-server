import MarketFetcher from '../libs/marketFetcher';
import Price from './price';

enum AxieStage {
    egg = 'egg',
    adult = 'adult',
}

class AxieStats {
    public hp: number = 0;
    public speed: number = 0;
    public skill: number = 0;
    public morale: number = 0;
}

class AxieAuction {
    public _startingPrice: Price;
    public _endingPrice: Price;
    public _startingTimestamp: number;
    public _endingTimestamp: number;
    
    public get duration () : number {
        return this._endingTimestamp - this._startingTimestamp
    }

    public set startingTimestamp (v : string) {
        this._startingTimestamp = parseInt(v);
    }

    public set endingTimestamp (v : string) {
        this._endingTimestamp = parseInt(v);
    }

    public set startingPrice (v : string) {
        this._startingPrice = new Price(v);
    }
    
    public set endingPrice (v : string) {
        this._endingPrice = new Price(v);
    }
    
    //TODO: not yet test
    public get currentPrice() : Price {
        return new Price((Date.now() / 1000 - this._startingTimestamp) /  (this._endingTimestamp - this._startingTimestamp));
    }
}

class Axie {

    public id: string;
    public name: string;
    public image: string;
    public price: string;
    public priceUSD: string;
    public stage: AxieStage;
    public matronId: string;
    public sireId: string;
    public matron: Axie = null;
    public sire: Axie = null;
    public stats: AxieStats = new AxieStats();
    public auction: AxieAuction = new AxieAuction();
    
    constructor (id: string, name: string, image: string, price: string, priceUSD: string, stage: AxieStage, matronId: string, sireId: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.priceUSD = priceUSD;
        this.stage = stage;
        this.matronId = matronId;
        this.sireId = sireId;
    }

    public setStats (hp: number, speed: number, skill: number, morale: number) {
        this.stats.hp = hp;
        this.stats.speed = speed;
        this.stats.skill = skill;
        this.stats.morale = morale;
    }

    public setAuction (startingPrice: string, endingPrice: string, startingTimestamp: string, endingTimestamp: string) {
        this.auction.startingPrice = startingPrice;
        this.auction.endingPrice = endingPrice;
        this.auction.startingTimestamp = startingTimestamp;
        this.auction.endingTimestamp = endingTimestamp;
    }

    public async getParents(): Promise<Axie[]> {
        if (this.matron === null || this.sire === null) {
            this.matron = await MarketFetcher.getAxie(this.matronId);
            this.sire = await MarketFetcher.getAxie(this.sireId);
        }
        return [this.matron, this.sire]
    }
}

export {Axie, AxieStage, AxieAuction};