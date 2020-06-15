const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getSelected);
router.post('/testimonials', TestimonialController.postNew);
router.put('/testimonials/:id', TestimonialController.modifyDoc);
router.delete('/testimonials/:id', TestimonialController.deleteDoc);

module.exports = router;