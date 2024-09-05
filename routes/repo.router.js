const reporouter=require('express').Router();

const repoController=require('../controllers/repoController');

reporouter.post("/repo/create",repoController.createRepository);
reporouter.get("/repo/all",repoController.getAllRepo);
reporouter.get("/repo/:id",repoController.fetchRepoById);

reporouter.get("/repo/name/:name",repoController.fetchRepoByName);
reporouter.get("/repo/user/:userId",repoController.fetchRepoForCurrentUser);
reporouter.put("/repo/update/:id",repoController.upadateRepoById);
reporouter.delete("/repo/delete/:id",repoController.deleteRepoById);
reporouter.patch("/repo/toggle/:id",repoController.toggleVisibilityById);

module.exports=reporouter;