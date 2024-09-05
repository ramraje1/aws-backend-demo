const userrouter=require('./user.router');
const reporouter=require('./repo.router');
const issuerouter=require('./issue.router')
const mainrouter=require('express').Router();

mainrouter.use(userrouter);
mainrouter.use(reporouter);
mainrouter.use(issuerouter);
mainrouter.get("/",(req,res)=>{
  res.send('welcomw ')    
})
module.exports=mainrouter;