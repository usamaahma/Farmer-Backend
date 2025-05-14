const express = require('express');
const checkoutController = require('../../controllers/checkout.controller');

const router = express.Router();

router.route('/').post(checkoutController.createCheckout).get(checkoutController.getAllCheckouts);

router
  .route('/:id')
  .get(checkoutController.getCheckoutById)
  .put(checkoutController.updateCheckoutById)
  .delete(checkoutController.deleteCheckoutById);

router.route('/farmer/:farmerId').get(checkoutController.getCheckoutsByFarmerId);

module.exports = router;
