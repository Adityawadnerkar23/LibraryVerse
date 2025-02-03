const mongoose=require('mongoose');
const { Schema }=mongoose;

const bookSchema = new Schema({
    book_name:{type:String,required:true},
    book_price:{type:String,required:true},
    author_name:{type:String,required:true},
    publication_name:{type:String,required:true},
    book_image:{type:String},

})
module.exports=mongoose.model('Directory',bookSchema);