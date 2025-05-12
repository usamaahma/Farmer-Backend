const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (eventBody) => {
  return Event.create(eventBody);
};

const queryEvents = async (filter, options) => {
  const events = await Event.paginate(filter, options);
  return events;
};

const getEventById = async (id) => {
  return Event.findById(id);
};

const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  await event.remove();
  return event;
};

module.exports = {
  createEvent,
  queryEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
