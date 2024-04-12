const { default: mongoose } = require('mongoose');
const CropIncome = require('../models/cropIncomeModel');
const Crop = require('../models/cropsModel');


const createCropIncome = async (req, res) => {
    try {
        const { cropid, date, price, weight } = req.body;

        // Create a new CropIncome instance
        const newCropIncome = new CropIncome({ date, price, weight });

        // Save the new CropIncome instance
        await newCropIncome.save();

        // Get the existing crop by ID
        const existingCrop = await Crop.findById(cropid);
        if (!existingCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // Push the ID of the newly created CropIncome into cropsincomeid array
        existingCrop.cropsincomeid.push(newCropIncome._id);

        // Save the updated crop with the new CropIncome ID
        await existingCrop.save();

        res.status(201).json({ message: 'Cropincome added successfully ' });
    } catch (error) {
        console.error('Error adding crop income:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const updateCropIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Find the CropIncome document by ID and update it
        const updatedIncome = await CropIncome.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedIncome) {
            return res.status(404).json({ error: 'CropIncome not found' });
        }

        res.status(200).json({ message: 'CropIncome updated successfully', cropIncome: updatedIncome });
    } catch (error) {
        console.error('Error updating CropIncome:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const deleteCropIncome = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the CropIncome document by ID
        const deletedIncome = await CropIncome.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ error: 'CropIncome not found' });
        }

        // Remove the ID of the deleted CropIncome from corresponding Crops
        await Crop.updateMany({ $pull: { cropsincomeid: id } });

        res.status(200).json({ message: 'CropIncome deleted successfully', cropIncome: deletedIncome });
    } catch (error) {
        console.error('Error deleting CropIncome:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

module.exports = { createCropIncome, updateCropIncome, deleteCropIncome };
