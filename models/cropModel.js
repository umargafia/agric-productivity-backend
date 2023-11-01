const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  plantingAndSowingGuidelines: String,
  soilPreparation: String,
  growingConditions: String,
  wateringAndIrrigation: String,
  fertilization: String,
  pestAndDiseaseManagement: String,
  harvesting: String,
  marketing: String,
  bestPractices: String
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
