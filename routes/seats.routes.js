const express = require('express');
const router = express.Router();
const uuid = require('uuid-random');
const db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
    const random = Math.floor(Math.random() * (db.seats.length));
    res.json(db.seats[random]);
});

router.route('/seats/:id').get((req, res) => {
    const elem = db.seats.find(item => {
        return item.id == req.params.id
     });
    res.json(elem);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuid();

    const newSeat = {
        id: id,
        day: day,
        seat: seat,
        client: client,
        email: email,
    };

    const checkSeat = db.seats.some(seat => seat.day == newSeat.day && seat.seat == newSeat.seat);

    if(checkSeat === true){    
        res.json( {message: 'Sorry, the slot is already taken'} );
    }
    else {
        db.seats.push(newSeat);
        res.json( {message: 'OK'} );
    }
});

router.route('/seats/:id').put((req, res) => {
    const { author, text } = req.body;

    const elem = {
        id: req.params.id,
        author: author,
        text: text,
    }

    if(author && text){
        db.seats.push(elem);
        res.json({ message: 'OK' });
    }
    else {
        res.json('Some data is missing...');
    }
});

router.route('/seats/:id').delete((req, res) => {
    const elem = db.seats.find(item => {
        return item.id == req.params.id
    });

    const index = db.seats.indexOf(elem);

    db.seats.splice(index, 1);

    res.json({ message: 'OK' });
});

module.exports = router;