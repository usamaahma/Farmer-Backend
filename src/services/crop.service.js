const httpStatus = require('http-status');
const { Crop } = require('../models');
const ApiError = require('../utils/ApiError');

const createCrop = async (cropBody) => {
  return Crop.create(cropBody);
};

const queryCrops = async (filter, options) => {
  const crops = await Crop.paginate(filter, options);
  return crops;
};

const getCropById = async (id) => {
  return Crop.findById(id).populate('postedBy');
};

const updateCropById = async (cropId, updateBody) => {
  const crop = await getCropById(cropId);
  if (!crop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found');
  }
  Object.assign(crop, updateBody);
  await crop.save();
  return crop;
};

const deleteCropById = async (cropId) => {
  const crop = await getCropById(cropId);
  if (!crop) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found');
  }
  await crop.remove();
  return crop;
};

// New function to get crops by userId
const getCropsByUser = async (postedBy, options) => {
  const crops = await Crop.paginate({ postedBy }, options);
  if (!crops) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No crops found for this user');
  }
  return crops;
};

module.exports = {
  createCrop,
  queryCrops,
  getCropById,
  updateCropById,
  deleteCropById,
  getCropsByUser, // Export the new function
};
