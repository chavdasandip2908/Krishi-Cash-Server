// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const cropIncomeController = require('../controllers/cropIncomeController');

router.post('/', cropIncomeController.createCropIncome);
router.put('/:id', cropIncomeController.updateCropIncome);
router.delete('/:id', cropIncomeController.deleteCropIncome);

module.exports = router;
