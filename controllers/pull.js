const fs=require('fs').promises;
const path=require('path');
const {s3,S3_BUCKET}=require('../config/aws-config');
async function pullFile(){
  const repoPath=path.resolve(process.cwd(),".Git");
  const commitpath=path.join(repoPath,"commits");
  try{
  const data=await s3.listObjectsV2({
    Bucket:S3_BUCKET,
    Prefix:"commits/",
  }).promise();
  const objects=data.Contents;
  for(const obj of objects){
    const key=obj.Key;
    const commitDir=path.join(
      commitsPath,
      path.dirname(key).split("/").pop()
    );
    await fs.mkdir(commitDir,{recursive:true});
    const params={
      Bucket:S3_BUCKET,
      Key:key,
    };
    const fileContent=await s3.getObject(params).promise();
   await fs.writeFile(path.join(repoPath,key),fileContent.Body);
   console.log("all data has been pulled");
    }
  }catch(error){
    console.error("error has benn occ",error);
  }
}
module.exports={pullFile};