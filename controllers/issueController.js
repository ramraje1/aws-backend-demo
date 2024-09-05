const mongoose=require('mongoose');
const User=require('../modules/userModel');
const Issue=require('../modules/issueModel');
const Repositories=require('../modules/repoModel');
const httpstatus=require('http-status');

const createIssue=async(req,res)=>{
  const {title,description}=req.body;
  const currenId=req.params.id;
  if(!title || !description){
return res.status(httpstatus.BAD_REQUEST).json({message:"please provide all req fild"});
  }
  try{
  const newUser=new Issue({
   title,
   description,
  repository:currenId
  })
  const result=await newUser.save();
  res.status(httpstatus.OK).json({data:result});
  }catch(error){
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({message:error.message});
  }
}
const updateIssueById=(req,res)=>{
  res.send('Repository created');
}
const deleteIssueById=(req,res)=>{
  res.send('Repository created');
}
const getAllIssue=(req,res)=>{
  res.send('Repository geted');
}
const getIssueById=(req,res)=>{
  res.send('Repository created');
}
module.exports={
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById
}