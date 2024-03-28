// src/models/userModel.js
const mongoose = require('mongoose');

const cropIncomeSchema = new mongoose.Schema({
    date: { type: String, required: true },
    price: { type: String, required: true },
    weight: { type: String, required: true }
});

const CropIncome = mongoose.model('CropIncome', cropIncomeSchema);

module.exports = CropIncome;
