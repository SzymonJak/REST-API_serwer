const express = require('express');
const router = express.Router();
const uuid = require('uuid-random');
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const random = Math.floor(Math.random() * (db.testimonials.length));
    res.json(db.testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
    const elem = db.testimonials.find(item => {
        return item.id == req.params.id
     });
    res.json(elem);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuid();

    if(author && text && id){    
        const newTestimonial = {
            id: id,
            author: author,
            text: text,
        };
        db.testimonials.push(newTestimonial);
        res.json( {message: 'OK'} );
    }
    else {
        res.json('Some data is missing...');
    }
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;

    const elem = db.testimonials.find(item => {
        return item.id == req.params.id
    });

    const index = db.testimonials.indexOf(elem);

    if(author && text){
        db.testimonials[index] = {...elem, author, text};
        res.json({ message: 'OK' });
    }
    else {
        res.json('Some data is missing...');
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const elem = db.testimonials.find(item => {
        return item.id == req.params.id
    });

    const index = db.testimonials.indexOf(elem);

    db.testimonials.splice(index, 1);

    res.json({ message: 'OK' });
});

module.exports = router;