const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if(!seat) res.status(404).json({message: 'Not found'});
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getSelected = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({message: 'Not found'});
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.postNew = async (req, res) => {
    const {day, seat, client, email} = req.body;

    if(day && seat && client && email) {
        try {
            const newSeat = new Seat({ day, seat, client, email });
            await newSeat.save();
            res.json({message: 'OK'});
        }
        catch(err) {
            res.status(500).json({message: err});
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.modifyDoc = async (req, res) => {
    const {day, seat, client, email} = req.body;

    if(day && seat && client && email) {
        try {
           const seat = Seat.findById(req.params.id);
           if(seat) {
            await Seat.updateOne({_id: req.params.id}, {$set: { day, seat, client, email }});
            res.json({message: 'OK'});
           } 
           else res.status(404).json({ message: 'Not found...' });
        }
        catch(err) {
            res.status(500).json({message: err});
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.deleteDoc = async (req, res) => {
    try {
    const seat = await Seat.findById(req.params.id);
        if(seat){
            await seat.remove();
            res.json({message: 'OK'});
        } else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};