const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEvent = {
  body: Joi.object().keys({
    eventName: Joi.string().allow('', null),
    location: Joi.string().allow('', null),
    farmerId: Joi.string().custom(objectId).allow('', null),
    email: Joi.string().email().allow('', null),
  }),
};

const getEvents = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

const updateEvent = {
  params: Joi.object().keys({
    eventId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      eventName: Joi.string().allow('', null),
      location: Joi.string().allow('', null),
      farmerId: Joi.string().custom(objectId).allow('', null),
      email: Joi.string().email().allow('', null),
    })
    .min(1),
};

const deleteEvent = {
  params: Joi.object().keys({
    eventId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
