import axios from 'axios'
import {Axie} from '../models/axie'

class MarketFetcher {

    static MARKET_ENDPOINT: string = 'https://axieinfinity.com/graphql-server-v2/graphql';
    
    static async getEggs(from: number, size: number): Promise<Axie[]> {
        return []
    }

    static async getParents() {
        const response = await axios.post(this.MARKET_ENDPOINT, {
            "operationName": "GetParentsBrief",
            "variables": {
                "matronId": "1316795",
                "sireId": "1316802"
            },
            "query": "query GetParentsBrief($matronId: ID!, $sireId: ID!) {\n  matron: axie(axieId: $matronId) {\n    ...AxieBrief\n    __typename\n  }\n  sire: axie(axieId: $sireId) {\n    ...AxieBrief\n    __typename\n  }\n}\n\nfragment AxieBrief on Axie {\n  id\n  name\n  stage\n  class\n  breedCount\n  image\n  title\n  battleInfo {\n    banned\n    __typename\n  }\n  auction {\n    currentPrice\n    currentPriceUSD\n    __typename\n  }\n  parts {\n    id\n    name\n    class\n    type\n    specialGenes\n    __typename\n  }\n  __typename\n}\n"
        })
    }

    static async getAdults(from: number, size: number) {
        
    }

    static async getAxies(from: number, size: number) {
        
    }
}

export default MarketFetcher;