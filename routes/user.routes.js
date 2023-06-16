const { Router } = require("express");
const { adduser, loginuser } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/adduser", adduser);
userRouter.post("/loginuser", loginuser);

module.exports = userRouter;
