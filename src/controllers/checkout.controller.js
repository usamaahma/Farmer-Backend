const httpStatus = require('http-status');
const checkoutService = require('../services/checkout.service');

const createCheckout = async (req, res) => {
  const checkout = await checkoutService.createCheckout(req.body);
  res.status(httpStatus.CREATED).send(checkout);
};

const getAllCheckouts = async (req, res) => {
  const checkouts = await checkoutService.getAllCheckouts();
  res.send(checkouts);
};

const getCheckoutById = async (req, res) => {
  const checkout = await checkoutService.getCheckoutById(req.params.id);
  if (!checkout) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Checkout not found' });
  }
  res.send(checkout);
};

const updateCheckoutById = async (req, res) => {
  const updated = await checkoutService.updateCheckoutById(req.params.id, req.body);
  if (!updated) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Checkout not found' });
  }
  res.send(updated);
};

const deleteCheckoutById = async (req, res) => {
  const deleted = await checkoutService.deleteCheckoutById(req.params.id);
  if (!deleted) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'Checkout not found' });
  }
  res.status(httpStatus.NO_CONTENT).send();
};

const getCheckoutsByFarmerId = async (req, res) => {
  const checkouts = await checkoutService.getCheckoutsByFarmerId(req.params.farmerId);
  res.send(checkouts);
};

module.exports = {
  createCheckout,
  getAllCheckouts,
  getCheckoutById,
  updateCheckoutById,
  deleteCheckoutById,
  getCheckoutsByFarmerId,
};
