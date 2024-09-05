const userrouter=require('express').Router();

const userController=require('../controllers/userController');

userrouter.get("/alluser",userController.getUserInfo);
userrouter.post("/signup",userController.signUp);
userrouter.post("/login",userController.login);

userrouter.put("/updateprofile/:id",userController.updateUserProfile);
userrouter.get("/userprofile/:id",userController.getUserProfile);
userrouter.delete("/deleteprofile/:id",userController.deleteUserProfile);

module.exports=userrouter;