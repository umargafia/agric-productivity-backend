const express = require('express');
const router = express.Router();
const Crop = require('../models/cropModel');
const CropInfo = require('./CropInfo');
const CropItem = require('./Crop');

// Create a new crop
router.post('/insertData', async (req, res) => {
  // res.json({ crops: CropItem, cropInfo: CropInfo });

  const crops = [];
  //create a new array of crops object

  for (let i = 0; i < CropItem.length; i++) {
    for (let j = 0; j < CropInfo.length; j++) {
      if (CropItem[i].id === CropInfo[j].id) {
        crops.push({
          name: CropItem[i].name,
          url: CropItem[i].url,
          description: CropInfo[j].description,
          plantingAndSowingGuidelines: CropInfo[j].plantingAndSowingGuidelines,
          soilPreparation: CropInfo[j].soilPreparation,
          growingConditions: CropInfo[j].growingConditions,
          wateringAndIrrigation: CropInfo[j].wateringAndIrrigation,
          fertilization: CropInfo[j].fertilization,
          pestAndDiseaseManagement: CropInfo[j].pestAndDiseaseManagement,
          harvesting: CropInfo[j].harvesting,
          marketing: CropInfo[j].marketing,
          bestPractices: CropInfo[j].bestPractices
        });
      }
    }
  }

  //map the array object to create a new crops

  try {
    const savedCrop = await Crop.insertMany(crops);
    res.status(201).json(savedCrop);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create crop', details: error.message });
  }
});

// Create a new crop
router.post('/create', async (req, res) => {
  try {
    const newCrop = new Crop(req.body);
    const savedCrop = await newCrop.save();
    res.status(201).json(savedCrop);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create crop', details: error.message });
  }
});

// Update a crop by its ID
router.put('/update/:id', async (req, res) => {
  try {
    const cropId = req.params.id;
    const existingCrop = await Crop.findById(cropId);

    if (!existingCrop) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    existingCrop.set(req.body);
    const updatedCrop = await existingCrop.save();
    res.json(updatedCrop);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to update crop', details: error.message });
  }
});

// Get a list of all crops
router.get('/all', async (req, res) => {
  try {
    const allCrops = await Crop.find();
    res.json(allCrops);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to retrieve crops', details: error.message });
  }
});

module.exports = router;
