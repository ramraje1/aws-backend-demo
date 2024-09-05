const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const http=require('http');
const httpstatus=require('http-status');
const {Server}=require('socket.io');
const mainrouter=require('./routes/main.router')

const yargs=require('yargs');

const {hideBin}=require('yargs/helpers');
const {initRepo}=require('./controllers/init');
const { addfile } = require('./controllers/add');
const { commitFile } = require('./controllers/commit');
const { pushFile } = require('./controllers/push');
const { pullFile } = require('./controllers/pull');
const { revertFile } = require('./controllers/revert');
const { error } = require('console');
dotenv.config();

yargs(hideBin(process.argv)).command(
  "start",
  "start the new server",
  {},
  startServer)
  .command(
  "init",
  "initialize the new repository",
  {},
  initRepo)
  .command(
  "add <file>",
  "add the new file to the  repository",
  (yargs)=>{
    yargs.positional("file",{
      describe:"file to add the staging area",
      type:"string"
    })
  },
  (argv)=>{
    addfile(argv.file);
  }
).command(
  "commit <message>",
  "commit the changes in th file",
  (yargs)=>{
    yargs.positional("message",{
      describe:"commit message",
      type:"string"
    })
  },
  (argv)=>{
    commitFile(argv.message)
  }
  
).command(
  "push",
  "push the new file",
  {},
  pushFile
).command(
  "pull",
  "pull the new file",
  {},
  pullFile
).command(
  "revert <commitID>",
  "revert the new file",
  (yargs)=>{
    yargs.positional("commitID",{
      describe:"revert id",
      type:"string"
    })
  },
  (argv)=>{
    revertFile(argv.commitID); 
  }
).demandCommand(1,"you need at least one command").help().argv;

function startServer(){
  const app=express();
  let url=process.env.MONGO_URL;
  let port=process.env.PORT||8000;
  app.use(bodyParser.json());
  app.use(cors({origin:"*",
    methods:["GET","POST"],
  }));
  app.use(express.json());

  mongoose.connect(url).then((connection)=>{
    console.log(`app connect on host ${connection.connection.host}`);
  }).catch((error)=>{
    console.log(error);
    
  })
  app.use("/",mainrouter);
let user="test";
const httpServer=http.createServer(app);
const io=new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST"],
  }
});
io.on("connection",(socket)=>{
  socket.on("joinRoom",(userID)=>{
    user=userID;
    console.log("====");
    console.log(user);
    console.log("====");
    console.log(userID);
  })
})
const db=mongoose.connection;

db.once("open",async()=>{
  console.log("crud operation called");
   //crud operation
})
  httpServer.listen(port,()=>{
    console.log(`app listen on port ${port}`);
   
  });
}