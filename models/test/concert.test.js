const mongoose = require('mongoose');
const Concert = require('../concert.model');
const expect = require('chai').expect;

describe('Concert', () => {

    it('should throw an error if any arg is missing', () => {
        const conc = new Concert({});

        conc.validate(err => {
            expect(err.errors.performer).to.exist;
            expect(err.errors.genre).to.exist;
            expect(err.errors.price).to.exist;
            expect(err.errors.day).to.exist;
            expect(err.errors.image).to.exist;
        });
    });

    it('should throw an error if any arg is not a string', () => {
        const cases = [
            [[], [], [], [], []],
            [{}, {}, {}, {}, {}]
        ];

        for (let option of cases) {
            const [performer, genre, price, day, image] = option;
            const conc = new Concert({performer, genre, price, day, image});

            conc.validate(err => {
                expect(err.errors.performer).to.exist;
                expect(err.errors.genre).to.exist;
                expect(err.errors.price).to.exist;
                expect(err.errors.day).to.exist;
                expect(err.errors.image).to.exist;
            });
        }
    });

    it('should not thrrow an error if all data is OK', () => {
        const performer = 'John',
            genre = 'Rock',
            price = 25,
            day = 2,
            image = 'newConc.jpg';

        const conc = new Concert({performer, genre, price, day, image});

        conc.validate(err => {
            expect(err).to.not.exist;
        });
    });

});

after(() => {
    mongoose.models = {};
});