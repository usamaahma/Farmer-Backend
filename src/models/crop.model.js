const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cropSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    reviews: {
      type: [String],
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

cropSchema.plugin(toJSON);
cropSchema.plugin(paginate);

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
