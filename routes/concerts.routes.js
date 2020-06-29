const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getSelected);
router.post('/concerts', ConcertController.postNew);
router.put('/concerts/:id', ConcertController.modifyDoc);
router.delete('/concerts/:id', ConcertController.deleteDoc);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);
router.get('/concerts/day/:day', ConcertController.getDay);

module.exports = router;