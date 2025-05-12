// models/contact.model.js
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate(value) {
        if (!/^\+?\d{10,15}$/.test(value)) {
          throw new Error('Invalid phone number');
        }
      },
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin toJSON to convert mongoose documents to JSON
contactSchema.plugin(toJSON);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
