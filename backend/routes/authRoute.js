const express = require("express");
const { register, login, logout } = require("../controllers/authController");


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);



module.exports = authRouter;