const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const testi = await Testimonial.findOne().skip(rand);
        if(!testi) res.status(404).json({message: 'Not found'});
        else res.json(testi);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getSelected = async (req, res) => {
    try {
        const testi = await Testimonial.findById(req.params.id);
        if(!testi) res.status(404).json({message: 'Not found'});
        else res.json(testi);
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};

exports.postNew = async (req, res) => {
    const {author, text} = req.body;

    if(author && text) {
        try {
            const newTestimonial = new Testimonial({ author, text});
            await newTestimonial.save();
            res.json({message: 'OK'});
        }
        catch(err) {
            res.status(500).json({message: err});
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.modifyDoc = async (req, res) => {
    const {author, text} = req.body;

    if(author && text) {
        try {
           const testi = Testimonial.findById(req.params.id);
           if(testi) {
            await Testimonial.updateOne({_id: req.params.id}, {$set: {author, text}});
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
    const testi = await Testimonial.findById(req.params.id);
        if(testi){
            await testi.remove();
            res.json({message: 'OK'});
        } else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({message: err});
    }
};