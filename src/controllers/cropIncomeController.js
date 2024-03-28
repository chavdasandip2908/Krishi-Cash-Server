const { default: mongoose } = require('mongoose');
const CropIncome = require('../models/cropIncomeModel');
const Crop = require('../models/cropsModel');


const createCropIncome = async (req, res) => {
    try {
        const { cropid, date, price, weight } = req.body;

        const newCropIncome = new CropIncome({ date, price, weight });
        console.log(new mongoose.Types.ObjectId);

        const cropsincomeid = new mongoose.Types.ObjectId;

        // Check if crop exists
        const existingCrop = await Crop.findById(cropid);
        if (!existingCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // before push id check id is alredy exist
        // let incomeIds = existingCrop.cropsincomeid;
        // for (let i = 0; i < incomeIds.length; i++) {
        //     if (String(incomeIds[i]) === String(cropsincomeid)) {
        //         return res.status(409).json({ error: "This Income Id is already associated with this crop" })
        //     }
        // }

        // Push the new ID into cropsincomeid array
        existingCrop.cropsincomeid.push(cropsincomeid);

        // Save the updated crop
        await existingCrop.save();
        await newCropIncome.save();
        res.status(201).json({ message: 'crops income added' });

    } catch (error) {
        console.error('Error registering Crop:', error);
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
