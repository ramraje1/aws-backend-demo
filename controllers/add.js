const fs=require('fs').promises;
const path=require('path');
async function addfile(filepath) {
  const repoPath=path.resolve(process.cwd(),".Git");
  const staged=path.join(repoPath,"staged");
  try{
  await fs.mkdir(staged,{recursive:true});
  const fileName=path.basename(filepath);
  await fs.copyFile(filepath,path.join(staged,fileName));
  console.log(`file ${fileName} added to the sstage area`);
  }catch(error){
    console.error("error are thror",error);
  }
}
module.exports={addfile};