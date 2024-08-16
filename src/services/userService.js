const db = require("../models/index");

/// check email exist
const checkEmailExist = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

/// GET USER
const getAllUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll();
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({ where: { id: userId } });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

/// CREATE USER
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.firstName || !data.lastName || !data.email) {
        resolve({ errCode: 1, message: "missing input parameters" });
      }
      let check = await checkEmailExist(data.email);
      if (check === true) {
        resolve({ errCode: 2, message: "Email already exists" });
      }
      await db.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      resolve({ errCode: 0, message: "Create user successfully" });
    } catch (error) {
      reject(error);
    }
  });
};

///UPDATE USER
const updateUserById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errCode: 1, message: "missing input parameters" });
      }
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        await user.save();
        resolve({ errCode: 0, message: "Update user successful" });
      }
      resolve({ errCode: 2, message: "user not found" });
    } catch (error) {
      reject(error);
    }
  });
};

///DELETE USER
const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    if (!userId) {
      resolve({ errCode: 1, message: "missing input parameters" });
    }
    if (userId) {
      let user = await db.User.findOne({ where: { id: userId } });
      if (user) {
        await db.User.destroy({ where: { id: userId } });
        resolve({ errCode: 0, message: "delete user successful" });
      }
    }
    resolve({ errCode: 2, message: "user not found" });
    try {
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getAllUser, createNewUser, updateUserById, deleteUserById };
