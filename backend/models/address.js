const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  product_name: { type: String, required: true },
  product_price: { type: String, required: true },
  product_quantity: { type: String, required: true },
  manufacturing_date : { type: String, required: true },
  expiry_date: { type: String, required: true },
  category:{type:mongoose.Types.ObjectId}

});
module.exports = mongoose.model('Address', addressSchema);
