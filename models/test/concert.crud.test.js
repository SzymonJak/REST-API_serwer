const Concert = require('../concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Concert', () => {
    let fakeDB = new MongoMemoryServer();
    let conn
    before(async () => {
        try {
            const uri = await fakeDB.getConnectionString();
            conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testConcOne = new Concert({performer: 'Jan Kowalski', genre: 'Pop', price: 22, day: 1, image: 'new.jpg'});
            await testConcOne.save();

            const testConcTwo = new Concert({performer: 'Adam Malysz', genre: 'Pop', price: 30, day: 2, image: 'old.jpg'});
            await testConcTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const allConcs = await Concert.find();
            const expectedLength = 2;
            expect(allConcs.length).to.be.equal(expectedLength);
        });

        it('should render a proper document by various params with "findOne" method', async () => {
            const concOne = await Concert.findOne({performer: 'Jan Kowalski'});
            const concTwo = await Concert.findOne({price: 30});
            expect(concOne.day).to.be.equal(1);
            expect(concTwo.performer).to.be.equal('Adam Malysz');

        });

        it('should return proper documents within range', async () => {
            const cheaper = await Concert.find({price: {$lte: 25} || {$gte: 20}});
            expect(cheaper[0].performer).to.be.equal('Jan Kowalski');
        });

        after(async () => {
            await Concert.deleteMany();
        });

    });

    after(async () => {
        mongoose.models = {};
        await conn.disconnect();
        await fakeDB.stop();
    });

});