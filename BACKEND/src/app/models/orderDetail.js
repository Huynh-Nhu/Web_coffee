const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema ({
   idOrder: {
   type:Schema.Types.ObjectId,
   ref:"Order",
   require: true

   },
   idProduct:{
      type:Schema.Types.ObjectId,
      ref:"Product",
      require: true

   },
   quantityProduct:{
      type: String,
      require: true

   },
   priceAll:{
      type: String,
      require: true

   },
   localUser:{
      type: String,
      require: true

   },
   note:{
      type: String,

   }


});



const OrderDetail = mongoose.model('OrderDetail',  orderDetailSchema);
module.exports = OrderDetail;
