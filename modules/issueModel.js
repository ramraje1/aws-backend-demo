const mongoose=require('mongoose');
const { Schema } = mongoose;

const isseueSchema = new Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["open","closed"],
    default:'open',
  },
  repository:{
    type:Schema.Types.ObjectId,
    ref:"Repositories",
    required:true
  }
})
const Issue=mongoose.model('Issue',isseueSchema);
module.exports=Issue;