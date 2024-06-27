const mongoose = require('mongoose');
const { Schema } = mongoose; // Corrected import

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema); // Changed model name to 'Order'
