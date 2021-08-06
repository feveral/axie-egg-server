import { v4 as uuidv4 } from 'uuid';
import {Axie} from '../models/axie';
import MarketFetcher from '../libs/marketFetcher';
import Timer from '../libs/timer';

class EggSync {
    syncId: string;
    axie: Axie;
    constructor (syncId: string, axie: Axie) {
        this.syncId = syncId;
        this.axie = axie;
    }
}

class MarketSyncer {

    
    private _eggSyncs: Map<string, EggSync> = {} as Map<string, EggSync>;
    private _isSyncing: boolean = false;

    constructor () {
    }

    async startSync () {
        setInterval(() => {
            this._sync();
        }, 10000)
    }

    private async _sync () {
        if (this._isSyncing) return;
        this._isSyncing = true;
        const syncId = uuidv4();
        
        // const existEggIdSet = new Set(this._eggSyncs.map(es => es.axie.id));
        const eggIdsResult = await MarketFetcher.getAllMarketEggsId();
        
        for (const id of eggIdsResult[1]) {
            if (! (id in this._eggSyncs)) {
                const axie = await MarketFetcher.getAxie(id)
                await axie.getParents()
                await Timer.wait(300)
                this._eggSyncs.set(id, new EggSync(syncId, axie))
            }
        }
        
        // this._eggSyncs = fiter(es => {es.syncId === syncId}, this._eggSyncs)}
        this._isSyncing = false;
    }
}

export default new MarketSyncer();