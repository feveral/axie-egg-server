import {Axie} from './models/axie';
import MarketFetcher from './libs/marketFetcher';
import Timer from './libs/timer';

class eggMarket {

    private _eggs: Axie[];

    constructor () {
        this._eggs = [];
    }

    async startSync () {
        setInterval(() => {
            this._sync();
        }, 10000)
    }

    private async _sync () {
        const existEggIdSet = new Set(this._eggs.map(egg => egg.id));
        const eggIdsResult = await MarketFetcher.getAllMarketEggsId();
        
        for (const id of eggIdsResult[1]) {
            if (!existEggIdSet.has(id)) {
                const axie = await MarketFetcher.getAxie(id)
                await axie.getParents()
                await Timer.wait(300)
                this._eggs.push(axie)
            }
        }
    }
}

export default eggMarket;