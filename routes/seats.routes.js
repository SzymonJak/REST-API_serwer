const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getSelected);
router.post('/seats', SeatController.postNew);
router.put('/seats/:id', SeatController.modifyDoc);
router.delete('/seats/:id', SeatController.deleteDoc);

module.exports = router;