const express = require("express");
const userController = require("../controllers/userController");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/api/get-user", userController.handleGetAllUser);
  router.post("/api/create-user", userController.handleCreateUser);
  router.put("/api/update-user", userController.handleUpdateUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
