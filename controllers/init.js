const fs = require('fs').promises; // Importing the promise-based API of fs
const path = require('path'); // Correct import for the path module

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".Git");
  const commitsPath = path.join(repoPath, "commits");
  
  try {
    await fs.mkdir(repoPath, { recursive: true }); // Creating the .Git directory
    await fs.mkdir(commitsPath, { recursive: true }); // Creating the commits directory
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET })
    ); // Creating the config.json file
    console.log("repository initialized");
  } catch (error) {
    console.error(error); // Handling any errors
  }
}

module.exports = { initRepo };
// const fs=require('fs').promises;

// const path=require('path');
// async function initRepo(){
//   const repoPath=path.resolve(process.cwd(),".Git");
//   const commitsPath=path.join(repoPath,"commits");
//   await fs.mkdir(repoPath,{recursive:true});
//   await fs.mkdir(commitsPath,{recursive:true});
//   await fs.writeFile(path.join(repoPath,"config.json"),
// JSON.stringify({bucket:process.env.S3_BUCKET}))

// }