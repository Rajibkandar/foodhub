const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    // Check if the email exists in the database
    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      // Create a new order if the email does not exist
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      // Update existing order by pushing new data to order_data array
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/myorderData', async (req, res) => {
try{
  let myData=await Order.findOne({'email':req.body.email})
  res.json({orderData:myData})
}catch(error){
  res.status(500).json({ success: false, error: error.message });
}
});


module.exports = router;
