import * as assert from "assert";
import {expect} from "chai";
import Price from '../../src/models/price'

describe('models/price', () => {

    it('test string to int case1', () => {
        const p = new Price('97000000000000000');
        expect(p.valueNumber).to.equal(0.097);
    })

    it('test string to int case2', () => {
        const p = new Price('9600000000000000000');
        expect(p.valueNumber).to.equal(9.6);
    })

    it('test string to int case3', () => {
        const p = new Price('990000000000000000000');
        expect(p.valueNumber).to.equal(990);
    })

    it('test int to string case1', () => {
        const p = new Price(0.091);
        expect(p.valueString).to.equal('91000000000000000');
    })

    it('test int to string case2', () => {
        const p = new Price(0.92);
        expect(p.valueNumber).to.be.closeTo(0.92, 0.00001);
        expect(p.valueString.substr(0,10)).to.equal('9200000000');
    })

    it('test int to string case3', () => {
        const p = new Price(9.3);
        expect(p.valueString).to.equal('9300000000000000000');
    })

})