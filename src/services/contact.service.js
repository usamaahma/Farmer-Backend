const httpStatus = require('http-status');
const { Contact } = require('../models');
const ApiError = require('../utils/ApiError');

const createContact = async (contactBody) => {
  return Contact.create(contactBody);
};

const queryContacts = async (filter, options) => {
  const contacts = await Contact.paginate(filter, options);
  return contacts;
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  await contact.remove();
  return contact;
};

module.exports = {
  createContact,
  queryContacts,
  getContactById,
  deleteContactById,
};
