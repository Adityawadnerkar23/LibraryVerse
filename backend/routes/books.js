const express=require('express');
const router = express.Router();
const path =  require("path")
const cors = require('cors')
const book =require('../models/book');
const multer=require('multer');
const { stat } = require('fs');
const app=express();
const http=require('http').Server(app);
// const multerStorage =multer.diskStorage({
//   destination:(req,file,cb)=>{
//       const ext =file.mimetype.split("/")[0];
//       if(ext==="image"){
//           cb(null,"uploads/images");
//       }else{
//           cb(null,"uploads/others");
//       }
//   },
//   filename:(req,file,cb)=>{
//       cb(null,`${Date.now()}.${file.originalname}`);
//   },
// });
// const upload = multer({ storage: multerStorage });
// const storage =multer.diskStorage({
//   destination:function(req,file,cb){
//       cb(null,'../uploads');
//       cb(null,file.originalname)
//   }
// });
var uploadimage = multer({
      storage:multer.diskStorage({
      destination:function(req,file,cb){
      cb(null,'uploads');
      },
      filename:function(req,file,cb){
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname)
      );
      },
      }),
});
const socketIO=require('socket.io-client')(http,{
  cors:{
  origin:"http://localhost:3000"
  }
});
////////////////////////////add books/////////////////////////////////////////
router.post('/post_collection', async (req,res)=>{
try{
      const bookcollection = req.body;
      console.log(bookcollection,"CSollection")

      const newcollection =new book({
      book_name:bookcollection.book_name,
      book_price:bookcollection.book_price,
      author_name:bookcollection.author_name,
      publication_name:bookcollection.publication_name,
      })
      const result = newcollection.save()
      if(result){
      return res.status(201).json({status :201,message:'book collected',data:result});
      }else{
      return res.status(400).json({status :400,message:'book collected failed',data:{}});
      }
      }catch(error){

      }
});
////////////////////////////............./////////////////////////////////////////
/////////////////////////////////list////////////////////////////////////////////
router.get('/get_collection',async(req,res)=>{
try{
      const checkauthor=await book.find()
      if(checkauthor){
      return res.status(200).json({status:200,message:"found",data:checkauthor});
      }else{
      return res.status(401).json({status:401,message:' not exist'})

      }}catch(error){
      console.log(error)
      }
});
//////////////////////////////...........//////////////////////////////////////
/////////////////////////for deletion//////////////////////////////////////////
router.delete('/delete_collection/:id',async(req,res)=>{
try{
      const id=req.params.id;
      const deletedBook=await book.findByIdAndDelete(id)
      if(deletedBook){
      return res.status(200).json({status:200,message:"deleted",data:deletedBook});
      }else{
      return res.status(401).json({status:401,message:' not exist'})
      }
      }catch(error){
      console.log(error,"errorr")
      }
});
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////for keyword search//////////////////////////////
router.get('/getsearch_collection', async (req, res) => {
try {
      const book_name = req.query.book_name;

      if (!book_name) {
      return res.status(400).json({ status: 400, message: "Book name is required" });
      }
      const searchResults = await book.aggregate([
      {
      $match: {
      book_name: {
      $regex: book_name,
      $options: 'i'
      }
      }
      }
      ]);

      if (searchResults.length > 0) {
      return res.status(200).json({ status: 200, message: "Books found", data: searchResults });
      } else {
      return res.status(404).json({ status: 404, message: 'No books found' });
      }
      } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal server error' });
      }
});
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////for uploading the image/////////////////////////////////////////////////
router.post('/upload_image',uploadimage.single("file"), async (req, res) => {
try {
      console.log("id: ", req.query.id);
      const id  = req.query.id
      console.log("body: ", req.body);
      console.log("File: ", req.file);
      const result=await book.findByIdAndUpdate(id,{book_image:req.file.filename})
      res.status(200).json({ status: 200, message: "File uploaded successfully" });
      } catch (error) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
      }
});  
  //////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/getUpdate/:id', async (req,res)=>{
  try{
  const id =req.params.id
  const getid=await book.findById(id)
  console.log(getid,"fff")
  if(getid){
  res.status(200).json({status:200,message:"Update sucess",data:getid});
  }else{
  res.status(500).json({status:500,message:"FAILEd"}) 
    }
  }catch(error){
  console.error(error);}
});
router.put('/updatebook/:id',async(req,res)=>{
  const reqbody = req.body
  const id = req.params.id
  console.log(reqbody,"ok")
  const result = await book.findByIdAndUpdate(id,reqbody)
  try{
  if(reqbody.title){
return res.status(200).json({status:200,message:"update complete"})
  }}catch(error){
    console.log(error);
    return res.status(404).json({status:404,message:"FAILED"})
  }  
});
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
router.get('/chatapp', async(req,res)=>{
  res.json({
    message:'hello world',
  });
});

// updateLoanTypeStatus:async (req, res) =>{
// try{
//   const id = req.params.id;
//   const result = await LoanType.findByIdAndDelete(id);
//   if(result){
//   return  res.status(200).json({ status: 200, message: "Loan type deleted successfully"})
//   }else{
//     return res.status(404).json({ status: 404, message: "Loan type not found"})
//   }
// }catch(error){
//   console.log(error);
// }
// },
  module.exports = router;