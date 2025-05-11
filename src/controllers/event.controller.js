const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { eventService } = require('../services');

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

const getEvents = catchAsync(async (req, res) => {
  const result = await eventService.queryEvents(req.query, req.query);
  res.send(result);
});

const getEvent = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.eventId);
  if (!event) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Event not found' });
    return;
  }
  res.send(event);
});

const updateEvent = catchAsync(async (req, res) => {
  const event = await eventService.updateEventById(req.params.eventId, req.body);
  res.send(event);
});

const deleteEvent = catchAsync(async (req, res) => {
  await eventService.deleteEventById(req.params.eventId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
