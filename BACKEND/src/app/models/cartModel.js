const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    idUser:{
        type: Schema.Types.ObjectId,
        ref: "User",
        require:true,
    },
    idProduct:{
        type: String,  type:Schema.Types.ObjectId,
        ref:"Product",
        require: true
    },
    name:{
        type: String,
        require: true

    },
    image:{
        type: String,
        require: true
        
    },
    size:{
        type: String,
        require: true

    },
    quantity:{
        type: String,
        require: true

    },
    priceSize:{
        type: String,
        require: true

    },
    price:{
        type: String,
        require: true

    },
    note:{
        type: String,
    }
    

});



const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;
