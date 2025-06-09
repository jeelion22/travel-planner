const express = require("express");

const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/verify/:userId", userController.verifyAccount);
userRouter.post("/login", userController.login);
userRouter.get("/me", auth.isAuth, userController.me);
userRouter.get("/logout", auth.isAuth, userController.logout);
userRouter.post("/forgot-password", userController.forgotPassword);
userRouter.put("/password/reset", userController.verifyOtpAndUpdatePwd);
userRouter.put("/update", auth.isAuth, userController.update);

module.exports = userRouter;
