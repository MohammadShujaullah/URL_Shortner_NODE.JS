const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({

   shortId: {
      type: String,
       
      unique: true,
   },
   redirectUrl: {
      type: String,
      required: true,

   },

   visitHistory: [
      { timestamp: { type: Number } }
   ],

    // only  the user can see their shortIds On the wesite
   createdBy:{
      type:mongoose.Schema.Types.ObjectId,       // ham ek id generate karenge jo user ko reference krega
      ref:"users"                            
   },
  





}, { timestamps: true });


const URL=mongoose.model("url",urlSchema);

module.exports=URL;




