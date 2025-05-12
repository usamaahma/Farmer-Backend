const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const farmerFields = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  image: Joi.string(),
  experience: Joi.number().min(0).required(),
  area: Joi.number().min(0).required(),
  mainCrops: Joi.array().items(Joi.string()).min(1).required(),
  details: Joi.string().optional(),
  contact: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required(),
};

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().optional(),
    role: Joi.string().valid('user', 'admin', 'farmer'),
    farmer: Joi.object().keys(farmerFields).optional(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid('user', 'admin', 'farmer'),
      farmer: Joi.object().keys(farmerFields).optional(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
