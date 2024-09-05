const fs=require('fs').promises;
const path=require('path');
const {v4:uuidv4}=require('uuid')
async function commitFile(message){
  const repoFil=path.resolve(process.cwd(),".Git");
  const staged=path.join(repoFil,"staged");
  const commit=path.join(repoFil,"commits");
  try{
  const commitID=uuidv4();
  const commitDir=path.join(commit,commitID);
  await fs.mkdir(commitDir,{recursive:true});
  const files=await fs.readdir(staged);
  for(let file of files){
    await fs.copyFile(path.join(staged,file),
  path.join(commitDir,file))
  }
  await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message,date:new Date().toISOString()}));
  console.log(`commited id is ${commitID} & created with ${message}` );
  }catch(error){
    console.error("error has been ocured",error);
  }
  
  
}
module.exports={commitFile};