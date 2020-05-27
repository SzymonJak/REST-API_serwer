const express = require('express');
const router = express.Router();
const uuid = require('uuid-random');
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    const random = Math.floor(Math.random() * (db.concerts.length));
    res.json(db.concerts[random]);
});

router.route('/concerts/:id').get((req, res) => {
    const elem = db.concerts.find(item => {
        return item.id == req.params.id
     });
    res.json(elem);
});

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body;
    const id = uuid();

    if(author && text && id){    
        const newConcert = {
            id: id,
            author: author,
            text: text,
        };
        db.concerts.push(newConcert);
        res.json( {message: 'OK'} );
    }
    else {
        res.json('Some data is missing...');
    }
});

router.route('/concerts/:id').put((req, res) => {
    const { author, text } = req.body;

    const elem = db.concerts.find(item => {
        return item.id == req.params.id
    });

    const index = db.concerts.indexOf(elem);

    const newElem = {
        id: req.params.id,
        author: author,
        text: text,
    }

    if(author && text){
        db.concerts.splice(index, 1, newElem);
        res.json({ message: 'OK' });
    }
    else {
        res.json('Some data is missing...');
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const elem = db.concerts.find(item => {
        return item.id == req.params.id
    });

    const index = db.concerts.indexOf(elem);

    db.concerts.splice(index, 1);

    res.json({ message: 'OK' });
});

module.exports = router;