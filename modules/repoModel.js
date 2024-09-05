const mongoose=require('mongoose');
const { Schema } = mongoose;

const repoSchema = new Schema({
  name:{
    type:String,
    unique:true,
    required:true,
  },
  description:{
    type:String,

  },
  content:[
    {
      type:String,
    }
  ],
  visibility:{
    type:Boolean,
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  issues:[
    {
      type:Schema.Types.ObjectId,
      ref:"Issue"
    }
  ]
})
const Repositories=mongoose.model('Repositories',repoSchema);
module.exports=Repositories;