const Joi = require('joi');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().required().messages({
      'string.base': `"name" must be a string`,
      'string.empty': `"name" cannot be empty`,
      'any.required': `"name" is required`,
    }),
    email: Joi.string().email().required().messages({
      'string.email': `"email" must be a valid email`,
      'string.empty': `"email" cannot be empty`,
      'any.required': `"email" is required`,
    }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9+]{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': `"phoneNumber" must be a valid number (10 to 15 digits)`,
        'string.empty': `"phoneNumber" cannot be empty`,
        'any.required': `"phoneNumber" is required`,
      }),
    message: Joi.string().required().messages({
      'string.empty': `"message" cannot be empty`,
      'any.required': `"message" is required`,
    }),
  }),
};

const getContacts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createContact,
  getContacts,
};
