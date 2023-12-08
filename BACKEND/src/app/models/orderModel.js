const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mode addmin
const orderSchema = new Schema ({
   idUser: {
    type:Schema.Types.ObjectId,
    ref:"User",
    description:"id của khach hang",
    require: true

   },
   dayOrder:{
    type: String,
    require: true
   },
   dayCurrent:{
      type: String,
      require: true

   },
   status:{
    type: String,
    require: true,
    enum:['Pending', 'Completed'],
    default: 'Pending',
   }
});



const Order = mongoose.model('Order',  orderSchema);
module.exports = Order;
