const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const userAuth = require("../middleware/userAuth");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/logout", userAuth);


module.exports = authRouter;