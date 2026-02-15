const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const { signupFunc,
    loginFunc,
    checkLoginFunc,
    logoutFunc,
    profileFunc,
    updateFunc,
    deleteFunc, } = require('../controllers/auth.controller')

router.post("/signup", signupFunc);

router.post("/login", loginFunc);

router.get("/checklogin", authenticateUser, checkLoginFunc);

router.post("/logout", authenticateUser, logoutFunc);

router.get("/profile", authenticateUser, profileFunc);

router.put("/profile", authenticateUser, updateFunc);

router.delete("/profile", authenticateUser, deleteFunc);

module.exports = router;
