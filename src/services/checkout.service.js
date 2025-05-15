const Checkout = require('../models/checkout.model');

const createCheckout = async (checkoutBody) => {
  return Checkout.create(checkoutBody);
};

const getAllCheckouts = async () => {
  return Checkout.find();
};

const getCheckoutById = async (id) => {
  return Checkout.findById(id);
};

const updateCheckoutById = async (id, updateBody) => {
  const checkout = await Checkout.findByIdAndUpdate(id, updateBody, { new: true });
  return checkout;
};

const deleteCheckoutById = async (id) => {
  return Checkout.findByIdAndDelete(id);
};

const getCheckoutsByFarmerId = async (farmerId) => {
  return Checkout.find({ farmerId });
};

module.exports = {
  createCheckout,
  getAllCheckouts,
  getCheckoutById,
  updateCheckoutById,
  deleteCheckoutById,
  getCheckoutsByFarmerId,
};
