const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getSelected);
router.post('/concerts', ConcertController.postNew);
router.put('/concerts/:id', ConcertController.modifyDoc);
router.delete('/concerts/:id', ConcertController.deleteDoc);

module.exports = router;