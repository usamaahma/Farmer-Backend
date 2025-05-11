const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const contactService = require('../services/contact.service');

const createContactMessage = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send(contact);
});

const getContacts = catchAsync(async (req, res) => {
  const result = await contactService.queryContacts(req.query);
  res.send(result);
});

const getContact = catchAsync(async (req, res) => {
  const contact = await contactService.getContactById(req.params.contactId);
  if (!contact) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Contact not found' });
  } else {
    res.send(contact);
  }
});

const deleteContact = catchAsync(async (req, res) => {
  await contactService.deleteContactById(req.params.contactId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContactMessage,
  getContacts,
  getContact,
  deleteContact,
};
