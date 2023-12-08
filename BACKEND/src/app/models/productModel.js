const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    description: "Loại sản phẩm",
  },
  name: {
    type: String,
    required: true,
    description: "tên sản phẩm ắt buộc",
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Image' ,
    //  name: String,
     required: true,
     description: "Hình ảnh sản phẩm",
  },
  details: {
    type: String,
    description: "Thông tin chi tiết của sản phẩm",
    
  },
  sizeS: {
    type: String,
    require: true,
  },
  sizeM:{
    type: String,
    require: true,
  },
  status:{
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
