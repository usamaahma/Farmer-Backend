// models/checkout.model.js
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const checkoutSchema = mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming farmer is a user
      required: true,
    },
    product: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    user: {
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
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Online'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin to convert mongoose document to JSON
checkoutSchema.plugin(toJSON);

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
