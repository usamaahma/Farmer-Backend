const express = require('express');
const validate = require('../../middlewares/validate');
const cropValidation = require('../../validations/crop.validation');
const cropController = require('../../controllers/crop.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(cropValidation.createCrop), cropController.createCrop)
  .get(validate(cropValidation.getCrops), cropController.getCrops);

router
  .route('/:cropId')
  .get(validate(cropValidation.getCrop), cropController.getCrop)
  .patch(validate(cropValidation.updateCrop), cropController.updateCrop)
  .delete(validate(cropValidation.deleteCrop), cropController.deleteCrop);

module.exports = router;
