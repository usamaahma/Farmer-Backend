const express = require('express');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContactMessage)
  .get(validate(contactValidation.getContacts), contactController.getContacts);

router.route('/:contactId').get(contactController.getContact).delete(contactController.deleteContact);

module.exports = router;
