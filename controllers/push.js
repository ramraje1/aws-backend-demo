const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require('../config/aws-config');

async function pushFile() {
  const repoPath = path.resolve(process.cwd(), ".Git");
  const commits = path.join(repoPath, "commits");

  try {
    const commitPaths = await fs.readdir(commits); // Get the list of commit directories

    for (const commitPath of commitPaths) {
      const commitDir = path.join(commits, commitPath);
      const files = await fs.readdir(commitDir); // Get the list of files in the commit directory

      for (const file of files) {
        const filePath = path.join(commitDir, file); // Build the full path to the file
        const fileData = await fs.readFile(filePath); // Read the file data

        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitPath}/${file}`, // Corrected 'key' to 'Key'
          Body: fileData,
        };

        await s3.upload(params).promise(); // Upload the file to S3
      }

      console.log(`Data from commit ${commitPath} has been pushed to S3.`); // Log success for each commit
    }

    console.log("All data has been pushed to S3.");
  } catch (error) {
    console.error("An error has occurred:", error); // Corrected error message
  }
}

module.exports = { pushFile };
