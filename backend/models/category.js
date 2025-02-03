const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    Category_name:{type:String,required:true},
  })
  module.exports=mongoose.model('category',categorySchema);
