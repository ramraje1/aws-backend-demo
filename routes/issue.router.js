const issuerouter=require('express').Router();

const issueController=require('../controllers/issueController');

issuerouter.post("/issue/create",issueController.createIssue);
issuerouter.put("/issue/update/:id",issueController.updateIssueById);
issuerouter.delete("/issue/delete/:id",issueController.deleteIssueById);

issuerouter.get("/issue/all",issueController.getAllIssue);
issuerouter.get("/issue/:id",issueController.getIssueById);


module.exports=issuerouter;