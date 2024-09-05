const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {MongoClient, ReturnDocument}=require('mongodb');
const dotenv=require('dotenv');
const httpstatus=require('http-status');
const mongoose=require('mongoose');
dotenv.config();
var ObjectId=require('mongodb').ObjectId;
const url=process.env.MONGO_URL;
let client;
async function connectionClient() {
  if(!client){
    client=new MongoClient(url);
  }
  await client.connect();
}
const User=require('../modules/userModel');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { StatusCodes } = require('http-status-codes');

const signUp = async (req, res) => {
  const { username, email,password } = req.body;

  try {
    // await connectionClient(); // Ensure this function is defined and properly connects to your database
    // const db = client.db("github");
    // const userCollection = db.collection("users");
const user=await User.findOne({username});
    // const user = await userCollection.findOne({ username }); // Add await to the user query
    if (user) {
      return res.status(httpstatus.BAD_REQUEST).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10); // Correct method name
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      repositories: [],
      followedUser: [],
      starRepos: [],
    });

    const result = await newUser.save();
    const token = jwt.sign(
      { id: result._id }, // Use insertedId instead of insertId
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );


    // res.json({ token ,userId:result.insertedId});
    res.status(httpstatus.OK).json({message:"saved successfully",token,userId:result._id})
  } catch (error) {
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message); // Use StatusCodes instead of httpstatus
  }
};

module.exports = { signUp };

const login=async(req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
res.status(httpstatus.BAD_REQUEST).json("please provide");
  }
  try{
    // await connectionClient();
    // let db=client.db("mogodb");
    // let userCollection=db.userCollection("users");
    // let user=await userCollection.findOne({email});
    // await connectionClient(); // Ensure this function is defined and properly connects to your database
    // const db = client.db("github");
    // const userCollection = db.collection("users");

    const user = await User.findOne({ email });
    if(!user){
      return res.status(httpstatus.NON_AUTHORITATIVE_INFORMATION).json("Invalid crediantlist");

    }
    let compassword=await bcrypt.compare(password,user.password);
    if(!compassword){
      return res.status(httpstatus.NON_AUTHORITATIVE_INFORMATION).json("Invalid crediantlist");

    }
    const token= jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" })
res.json({token,userId:user._id});

  }catch(error){
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message);
  }

}
const getUserInfo=async(req,res)=>{
  try{
    await connectionClient();
    const db=client.db("github");
    const userCollection=db.collection("users");
    let user=await userCollection.find({}).toArray();
    return res.status(httpstatus.FOUND).json(user);
  }catch(error){
    return res.status(httpstatus.INTERNAL_SERVER_ERROR).json(error.message);
  }
}
const getUserProfile=async(req,res)=>{
  const currentId=req.params.id;
  try{
    // await connectionClient();
    // const db=client.db("github");
    // const userCollection=db.collection("users");
    // let user=await userCollection.findOne({
    //   _id:new ObjectId(currentId)
    // });
    let user=await User.findById(currentId);
    if(!user){
      return res.status(httpstatus.NOT_FOUND).json("NOT found");

    }
    res.status(200).json(user);
  }catch(error){
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({message:"error occured"});
  }
}
const updateUserProfile=async(req,res)=>{
  const currentId=req.params.id;
  const {email,password}=req.body;
  try{
    await connectionClient();
    const db=client.db("github");
    const userCollection=db.collection("users");
    
   let userInfo={email};
   if(password){
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    userInfo.password=hashedPassword;
   }
   const result=await userCollection.findOneAndUpdate({
_id:new ObjectId(currentId),
   },
 {$set: userInfo},
 {
  returnDocument: "after"
 }
  )
  // if(!result.value){
  //   return res.status(httpstatus.NOT_FOUND).json("NOT found");

  // }
  res.status(httpstatus.OK).json(result.value);
  }catch(error){
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({message:"error occured"});
  }
}
const deleteUserProfile=async(req,res)=>{
  const currentId=req.params.id;
  try{
    await connectionClient();
    const db=client.db("github");
    const userCollection=db.collection("users");
    let user=await userCollection.deleteOne({
      _id:new ObjectId(currentId)
    });
    if(user.deleteCount==0){
      return res.status(httpstatus.NOT_FOUND).json("NOT found");

    }
    res.status(httpstatus.FOUND).json({message:"user deleted"});
  }catch(error){
    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({message:"error occured"});
  }
  
}
module.exports={getUserInfo, signUp,login,getUserProfile,updateUserProfile,deleteUserProfile}