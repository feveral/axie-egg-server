import { AxieGene } from 'agp-npm/dist/axie-gene';
import { Cls } from 'agp-npm/dist/models/cls';
import { ColorGene } from 'agp-npm/dist/models/color';
import { Part } from 'agp-npm/dist/models/part';
import MarketFetcher from '../libs/marketFetcher';
import AxieAuction from './auction';

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

class Axie {
    public id: string;
    public name: string;
    public image: string;
    public stage: AxieStage;
    public matronId: string;
    public sireId: string;
    public matron: Axie = null;
    public sire: Axie = null;
    public stats: AxieStats = new AxieStats();
    public auction: AxieAuction = new AxieAuction();
    public geneCode: string;
    private _gene: AxieGene;
    
    constructor (id: string, name: string, image: string, stage: AxieStage, matronId: string, sireId: string, geneCode: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.stage = stage;
        this.matronId = matronId;
        this.sireId = sireId;
        this.geneCode = geneCode;
        this._gene = (geneCode === '0x0') ? null : new AxieGene(geneCode);
    }

    public setStats (hp: number, speed: number, skill: number, morale: number) {
        this.stats.hp = hp;
        this.stats.speed = speed;
        this.stats.skill = skill;
        this.stats.morale = morale;
    }

    public setAuction (startingPrice: string, endingPrice: string, startingTimestamp: string, endingTimestamp: string) {
        this.auction.setTimestamp(startingTimestamp, endingTimestamp);
        this.auction.setPrice(startingPrice, endingPrice);
    }

    public async loadParent() {
        this.matron = await MarketFetcher.getAxie(this.matronId);
        this.sire = await MarketFetcher.getAxie(this.sireId);        
    }

    public async getParents(): Promise<Axie[]> {
        if (this.matron === null || this.sire === null) {
            await this.loadParent()
        }
        return [this.matron, this.sire]
    }

    public get cls() : Cls {
        return this._gene !== null ? this._gene.cls : null
    }

    public get color() : ColorGene {
        return this._gene !== null ? this._gene.color : null
    }

    public get eyes() : Part {
        return this._gene !== null ? this._gene.eyes : null
    }

    public get ears() : Part {
        return this._gene !== null ? this._gene.ears : null
    }

    public get mouth() : Part {
        return this._gene !== null ? this._gene.mouth : null
    }

    public get horn() : Part {
        return this._gene !== null ? this._gene.horn : null
    }

    public get back() : Part {
        return this._gene !== null ? this._gene.back : null
    }

    public get tail() : Part {
        return this._gene !== null ? this._gene.tail : null
    }

    json () {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            stage: this.stage,
            stats: this.stats,
            matronId: this.matronId,
            sireId: this.sireId,
            geneCode: this.geneCode,
            gene: {
                cls: this.cls,
                color: this.color,
                eyes: this.eyes,
                ears: this.ears,
                mouth: this.mouth,
                horn: this.horn,
                back: this.back,
                tail: this.tail,
            }
        }
    }
}

export {Axie, AxieStage, AxieAuction};