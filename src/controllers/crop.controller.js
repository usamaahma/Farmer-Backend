const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cropService } = require('../services');

const createCrop = catchAsync(async (req, res) => {
  const crop = await cropService.createCrop(req.body);
  res.status(httpStatus.CREATED).send(crop);
});

const getCrops = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.postedBy) filter.postedBy = req.query.postedBy;
  const options = {
    sortBy: req.query.sortBy,
    limit: parseInt(req.query.limit, 10),
    page: parseInt(req.query.page, 10),
  };
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

module.exports = {
  createCrop,
  getCrops,
  getCrop,
  updateCrop,
  deleteCrop,
};
