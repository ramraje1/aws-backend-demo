const mongoose=require('mongoose');
const User=require('../modules/userModel');
const Repositories=require('../modules/repoModel');
const Issue=require('../modules/issueModel');
const httpstatus=require('http-status');
const createRepository=async(req,res)=>{
  const {name,description,content,owner,issues,visibility}=req.body;
  if(!name){
    return res.status(httpstatus.NOT_FOUND).json({name:"Repositry name is required"})
  }
  try{
    if(!mongoose.Types.ObjectId.isValid(owner)){
      return res.status(httpstatus.BAD_REQUEST).json({error:"user Id is required"});
    }
    const newUser=new Repositories({
      name,
      description,
      content,
      owner,
      issues,
      visibility
    })
const result=await newUser.save();

res.status(httpstatus.OK).json({message:"save successfully",repoId:result._id})

  }catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message); // Use StatusCodes instead of httpstatus
}
}

const getAllRepo=async(req,res)=>{
  try{
  const result=await Repositories.find({}).populate("owner").populate("issues");
  res.status(200).json({data:result});
  }catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message); // Use StatusCodes instead of httpstatus
}
}
const fetchRepoById=async(req,res)=>{
  const currentId=req.params.id;
  try{
  const result=await Repositories.findById(currentId)
  .populate("owner").populate("issues");
  res.status(httpstatus.OK).json({data:result});
  }catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message); // Use StatusCodes instead of httpstatus
}
}

const fetchRepoByName = async (req, res) => {
  const currentName = req.params.name;
  try {
    const result = await Repositories.findOne({ name: currentName })
      .populate("owner")
      .populate("issues");

    if (!result) {
      return res.status(httpstatus.NOT_FOUND).json({ message: "Repository not found" });
    }

    res.status(httpstatus.OK).json({ data: result });
  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = { fetchRepoByName };

const fetchRepoForCurrentUser=async(req,res)=>{
  const {userId}  = req.params;
  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    
    const result = await Repositories.findOne({ owner: objectId }); 
    // const result = await Repositories.findOne({ owner: currenId })
    

    if (!result) {
      return res.status(httpstatus.NOT_FOUND).json({ message: "Repository not found" });
    }

    res.status(200).json({data:result});
  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
const upadateRepoById=async(req,res)=>{
  const currenId=req.params.id;
  const {content,description}=req.body;
  try{
    const result=await Repositories.findByIdAndUpdate(currenId,
      {$set:content,description},
      {new:true}
    );
    if (!result) {
      return res.status(httpstatus.NOT_FOUND).json({ message: "Repository not found" });
    }

  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
const toggleVisibilityById=async(req,res)=>{
  const currenId=req.params.id;
  
  try{
    const repo=await Repositories.findById(currenId);
    if (!repo) {
      return res.status(httpstatus.NOT_FOUND).json({ message: "Repository not found" });
    }
    const newVisiability=!repo.visibility;
    const result=await Repositories.findByIdAndUpdate(currenId,
      {$set:{visibility:newVisiability}},
      {new:true}
    );

    res.status(httpstatus.OK).json({
      message: "Repository visibility toggled successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
const deleteRepoById=async(req,res)=>{
  const currentId=req.params.id;
  try{
  const result=await Repositories.findByIdAndDelete(currentId);
  if (!result) {
    return res.status(httpstatus.NOT_FOUND).json({ message: "Repository not found" });
  }
  res.status(httpstatus.OK).json({message:"deleted succefully"});
  }catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message); // Use StatusCodes instead of httpstatus
}
}
module.exports={
  createRepository,
  getAllRepo,
  fetchRepoById,
  fetchRepoByName,
  fetchRepoForCurrentUser,
  upadateRepoById,
  toggleVisibilityById,
  deleteRepoById
}