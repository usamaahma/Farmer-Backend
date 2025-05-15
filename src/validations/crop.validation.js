const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCrop = {
  body: Joi.object().keys({
    postedBy: Joi.string().required().custom(objectId),
    name: Joi.string().required(),
    image: Joi.string().uri().optional(),
    price: Joi.number().required(),
    inStock: Joi.boolean().optional(),
    reviews: Joi.array().items(Joi.string()).optional(),
    details: Joi.string().optional(),
  }),
};

const getCrops = {
  query: Joi.object().keys({
    name: Joi.string(),
    postedBy: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCrop = {
  params: Joi.object().keys({
    cropId: Joi.string().custom(objectId),
  }),
};

const updateCrop = {
  params: Joi.object().keys({
    cropId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      image: Joi.string().uri(),
      price: Joi.number(),
      inStock: Joi.boolean(),
      reviews: Joi.array().items(Joi.string()),
      details: Joi.string(),
    })
    .min(1),
};

const deleteCrop = {
  params: Joi.object().keys({
    cropId: Joi.string().custom(objectId),
  }),
};

// New function to get crops by userId
const getCropsByUser = {
  query: Joi.object().keys({
    postedBy: Joi.string().custom(objectId).required(), // Ensure the user ID is provided
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCrop,
  getCrops,
  getCrop,
  updateCrop,
  deleteCrop,
  getCropsByUser, // Export the new validation function
};
