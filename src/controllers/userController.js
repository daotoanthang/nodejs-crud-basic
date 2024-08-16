const db = require("../config/connectDB");
const userService = require("../services/userService");

let handleGetAllUser = async (req, res) => {
  userId = req.query.id;
  console.log(userId);
  if (!userId) {
    return res
      .status(200)
      .json({ errCode: 1, message: "Missing input parametes", users: [] });
  }
  let users = await userService.getAllUser(userId);

  return res.status(200).json({ errCode: 1, message: "OK", users: users });
};

let handleCreateUser = async (req, res) => {
  data = req.body;
  const message = await userService.createNewUser(data);
  console.log(data);
  console.log(message);

  return res.status(200).json(message);
};

let handleUpdateUser = async (req, res) => {
  data = req.body;
  let message = await userService.updateUserById(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  userId = req.body.id;
  let message = await userService.deleteUserById(userId);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};
