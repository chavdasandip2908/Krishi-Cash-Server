// src/models/userModel.js
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    type: { type: String, required: true },
    year: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    userid: { type: String, required: true },
    cropsincomeid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CropIncome' }]
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
