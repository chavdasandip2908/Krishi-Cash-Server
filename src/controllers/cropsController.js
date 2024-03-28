const Crop = require('../models/cropsModel');


const createCrop = async (req, res) => {
    try {
        const { croptype, year, name, image } = req.body;

        // Check if all required fields are provided
        if (!croptype || !year || !name || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        // if Crops Already Exist
        const existingCrop = await Crop.findOne({ year, name });
        if (existingCrop) {
            return res.status(400).json({ error: 'Crop already exists' });
        }
        const newCrop = new Crop({ croptype, year, name, image });
        await newCrop.save();
        res.status(201).json({ message: 'Crop created successfully', crop: newCrop });


    } catch (error) {
        console.error('Error registering Crop:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const updateCropIncomeId = async (req, res) => {
    try {
        const { id } = req.params;
        const { cropsincomeid } = req.body;

        // Check if crop exists
        const existingCrop = await Crop.findById(id);
        if (!existingCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        // before push id check id is alredy exist
        let incomeIds = existingCrop.cropsincomeid;
        for (let i = 0; i < incomeIds.length; i++) {
            if (String(incomeIds[i]) === String(cropsincomeid)) {
                return res.status(409).json({ error: "This Income Id is already associated with this crop" })
            }
        }

        // Push the new ID into cropsincomeid array
        existingCrop.cropsincomeid.push(cropsincomeid);

        // Save the updated crop
        await existingCrop.save();

        res.status(200).json({ message: 'Crop updated successfully', crop: existingCrop });
    } catch (error) {
        console.error('Error updating Crop:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const updateCrop = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Find the crop by ID and update it
        const updatedCrop = await Crop.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        res.status(200).json({ message: 'Crop updated successfully', crop: updatedCrop });
    } catch (error) {
        console.error('Error updating Crop:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const deleteCrop = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the crop by ID and delete it
        const deletedCrop = await Crop.findByIdAndDelete(id);

        if (!deletedCrop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        res.status(200).json({ message: 'Crop deleted successfully', crop: deletedCrop });
    } catch (error) {
        console.error('Error deleting Crop:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const getAllCrops = async (req, res) => {
    try {
        // Get all crops
        const crops = await Crop.find();
        res.status(200).json(crops);
    } catch (error) {
        console.error('Error fetching crops:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

const getCropById = async (req, res) => {
    try {
        const { id } = req.params;

        // Get crop by ID
        // here get Crop and CropIncome Data then send in response
        const crop = await Crop.findById(id).populate('cropsincomeid');

        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        res.status(200).json(crop);
    } catch (error) {
        console.error('Error fetching crop:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error });
    }
};

module.exports = { createCrop, updateCropIncomeId, updateCrop, deleteCrop, getAllCrops, getCropById };
