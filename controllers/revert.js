// const fs=require('fs').promises;
// const path=require('path');
// const {promisify}=require('util')
// const readdir=promisify(fs.readdir);
// const copyFile=promisify(fs.copyFile);
// async function revertFile(commitID){
// const repoPath=path.resolve(process.cwd(),".Git");
// const commitPath=path.join(repoPath,"commits");
// try{
// const commitDir=path.join(commitPath,commitID);
// const files=await readdir(commitDir);
// const parentDir=path.resolve(repoPath,"..");
// for(const file of files){
//   await copyFile(path.join(commitDir,file),path.join(parentDir,file));
// }
// console.log(`Commit ${commitID} reverted successfully`);
// }catch(error){
//   console.error("error has benn occured",error);
// }
// }
// module.exports={revertFile};
const fs = require('fs').promises;
const path = require('path');

async function revertFile(commitID) {
    const repoPath = path.resolve(process.cwd(), ".Git");
    const commitPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitPath, commitID);
        const files = await fs.readdir(commitDir); // Get the list of files in the commit directory
        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {
            await fs.copyFile(path.join(commitDir, file), path.join(parentDir, file)); // Copy each file
        }

        console.log(`Commit ${commitID} reverted successfully`);
    } catch (error) {
        console.error(`An error occurred while reverting commit ${commitID}:`, error);
    }
}

module.exports = { revertFile };
