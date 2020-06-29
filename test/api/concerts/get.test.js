const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', async () => {

    before(async () => {
        const testConcOne = new Concert({performer: 'Jan Kowalski', genre: 'Pop', price: 22, day: 1, image: 'new.jpg'});
        await testConcOne.save();

        const testConcTwo = new Concert({performer: 'Adam Malysz', genre: 'Rock', price: 30, day: 2, image: 'old.jpg'});
        await testConcTwo.save();
    });

    it('/performer/:performer should return performer by its name', async () => {

        const res = await request(server).get('/api/concerts/performer/Jan%20Kowalski');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('Jan Kowalski');

    });

    it('/genre/:genre should return concerts by its genre', async () => {

        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        
    });

    it('/price/:price_min/:price_max should return concerts by its price range', async () => {

        const res = await request(server).get('/api/concerts/price/15/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        expect(res.body.length).to.be.equal(2);
        
    });

    it('/day/:day should return concerts by its day', async () => {

        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
        
    });

    after(async () => {
        await Concert.deleteMany();
    });

});