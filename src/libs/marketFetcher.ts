import axios from 'axios'
import Timer from './timer'
import {Axie, AxieStage} from '../models/axie'

class MarketFetcher {

    static MARKET_ENDPOINT: string = 'https://axieinfinity.com/graphql-server-v2/graphql';
    
    static async getAllMarketEggsId(): Promise<[number, string[]]> {
        let from = 0;
        let size = 100;
        let eggsId = [];
        let eggTotal = 0;
        while (true) {
            const [total, ids] = await this.getMarketEggsId(from, size);
            from += ids.length;
            eggTotal = total;
            eggsId = eggsId.concat(ids)
            if (ids.length === 0) break;
        }
        return [eggTotal, eggsId]
    }

    static async getMarketEggsId(from: number, size: number): Promise<[number, string]> {
        const response = await axios.post(this.MARKET_ENDPOINT, {
            "operationName": "GetAxieLatest",
            "variables": {
                "from": from,
                "size": size,
                "sort": "PriceAsc",
                "auctionType": "Sale",
                "criteria": {
                    "stages": [1]
                }
            },
            "query": "query GetAxieLatest($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\n    total\n    results {\n      ...AxieRowData\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment AxieRowData on Axie {\n  id\n  image\n  class\n  name\n  genes\n  owner\n  class\n  stage\n  title\n  breedCount\n  level\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n"
        })
        const data = response.data.data.axies
        const total: number = data.total
        console.log(`[MarketFetcher] get market eggs: from(${from}) size(${size}), result size(${data.results.length})`)
        return [total, data.results.map(r => r.id)]
    }

    static async getAxiesByIds(ids: string[]): Promise<Axie[]> {
        const axies: Axie[] = []
        for (const id of ids) {
            axies.push(await MarketFetcher.getAxie(id))
            await Timer.wait(300)
        }
        for (const axie of axies) {
            await axie.getParents()
            await Timer.wait(300)
        }
        return axies
    }

    static async getAxie(axieId: string): Promise<Axie> {
        const response = await axios.post(this.MARKET_ENDPOINT, {
            "operationName": "GetAxieDetail",
            "variables": {
                "axieId": axieId
            },
            "query": "query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\nfragment AxieDetail on Axie {\n  id\n  image\n  class\n  chain\n  name\n  genes\n  owner\n  birthDate\n  bodyShape\n  class\n  sireId\n  sireClass\n  matronId\n  matronClass\n  stage\n  title\n  breedCount\n  level\n  figure {\n    atlas\n    model\n    image\n    __typename\n  }\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  }\n  children {\n    id\n    name\n    class\n    image\n    title\n    stage\n    __typename\n  }\n  __typename\n}\n\nfragment AxieBattleInfo on AxieBattleInfo {\n  banned\n  banUntil\n  level\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n"
        })
        const data = response.data.data.axie
        const axie = new Axie(  data.id, data.name, data.image, 
                                data.stage === 1 ? AxieStage.egg : AxieStage.adult,
                                data.matronId, data.sireId, data.genes)
        axie.setStats(data.stats.hp, data.stats.speed, data.stats.skill, data.stats.morale)
        if (data.auction !== null) {
            axie.setAuction(data.auction.startingPrice, 
                data.auction.endPrice,
                data.auction.startingTimestamp,
                data.auction.endingTimestamp)
        }
        console.log(`[MarketFetcher] get axie: ${axie.id}`)
        return axie
    }

    static async getMarketAdults(from: number, size: number) {
        
    }
}

export default MarketFetcher;