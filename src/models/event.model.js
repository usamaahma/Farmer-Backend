const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      default: null,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins
eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
