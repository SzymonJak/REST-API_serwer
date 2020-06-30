const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const conc = await Concert.findOne().skip(rand);
        if(!conc) res.status(404).json({message: 'Not found'});
        else res.json(conc);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getSelected = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if(!conc) res.status(404).json({message: 'Not found'});
        else res.json(conc);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getPerformer = async (req, res) => {
    try {
        const perf = await Concert.findOne({performer: req.params.performer});
        if(!perf) res.status(404).json({message: 'Not found'});
        else res.json(perf);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getGenre = async (req, res) => {
    try {
        const genr = await Concert.find({genre: req.params.genre});
        if(!genr) res.status(404).json({message: 'Not found'});
        else res.json(genr);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getByPrice = async (req, res) => {
    try {
        const day = await Concert.find({price: {$gte: req.params.price_min, $lte: req.params.price_max}});
        if(!day) res.status(404).json({message: 'Not found'});
        else res.json(day);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getDay = async (req, res) => {
    try {
        const day = await Concert.find({day: req.params.day});
        if(!day) res.status(404).json({message: 'Not found'});
        else res.json(day);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.postNew = async (req, res) => {
    const clean = sanitize(req.body);
    const {performer, genre, price, day, image} = clean;

    if(performer && genre && price && day && image) {
        try {
            const newConcert = new Concert({ performer, genre, price, day, image });
            await newConcert.save();
            res.json({message: 'OK'});
        }
        catch(err) {
            res.status(500).json({message: err});
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.modifyDoc = async (req, res) => {
    const {performer, genre, price, day, image} = req.body;

    if(performer && genre && price && day && image) {
        try {
           const conc = Concert.findById(req.params.id);
           if(conc) {
            await Concert.updateOne({_id: req.params.id}, {$set: { performer, genre, price, day, image }});
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
    const conc = await Concert.findById(req.params.id);
        if(conc){
            await conc.remove();
            res.json({message: 'OK'});
        } else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};