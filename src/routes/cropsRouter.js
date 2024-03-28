// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const cropsController = require('../controllers/cropsController');

router.post('/', cropsController.createCrop);
router.put('/incomeid/:id', cropsController.updateCropIncomeId);
router.put('/:id', cropsController.updateCrop);
router.delete('/:id', cropsController.deleteCrop);
// get all crops
router.get('/', cropsController.getAllCrops);
// Get a single crop by ID
router.get('/:id', cropsController.getCropById);

module.exports = router;
