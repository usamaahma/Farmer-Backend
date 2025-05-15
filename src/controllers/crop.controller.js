const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cropService } = require('../services');

const createCrop = catchAsync(async (req, res) => {
  const crop = await cropService.createCrop(req.body);
  res.status(httpStatus.CREATED).send(crop);
});

const getCrops = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.postedBy) {
    filter.postedBy = req.query.postedBy; // Filter by user ID if provided
  }

  // Check if we need to get crops by a specific user
  const options = {
    sortBy: req.query.sortBy,
    limit: parseInt(req.query.limit, 10),
    page: parseInt(req.query.page, 10),
  };

  // Use the existing service function to get crops, if postedBy is provided
  const result = await cropService.queryCrops(filter, options);
  res.send(result);
});

const getCrop = catchAsync(async (req, res) => {
  const crop = await cropService.getCropById(req.params.cropId);
  if (!crop) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Crop not found' });
  }
  res.send(crop);
});

const updateCrop = catchAsync(async (req, res) => {
  const crop = await cropService.updateCropById(req.params.cropId, req.body);
  res.send(crop);
});

const deleteCrop = catchAsync(async (req, res) => {
  await cropService.deleteCropById(req.params.cropId);
  res.status(httpStatus.NO_CONTENT).send();
});

// New controller method to get crops by user
const getCropsByUser = catchAsync(async (req, res) => {
  const { postedBy } = req.query; // Assuming the userId is passed as a query parameter
  const options = {
    limit: parseInt(req.query.limit, 10),
    page: parseInt(req.query.page, 10),
  };
  const crops = await cropService.getCropsByUser(postedBy, options);
  res.send(crops);
});

module.exports = {
  createCrop,
  getCrops,
  getCrop,
  updateCrop,
  deleteCrop,
  getCropsByUser, // Export the new controller method
};
