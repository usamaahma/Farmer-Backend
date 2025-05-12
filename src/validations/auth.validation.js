const Joi = require('joi');
const { password } = require('./custom.validation');

const farmerFields = {
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

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin', 'farmer').default('user'),
    farmer: Joi.object().keys(farmerFields).optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
