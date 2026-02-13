const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const { signupFunc, loginFunc, profilefunc, updatefunc, deletefunc } = require('../controllers/auth.controller')

router.post("/signup", signupFunc);

router.post("/login", loginFunc);

router.get("/profile", authenticateUser, profilefunc);

router.put("/profile", authenticateUser, updatefunc);

router.delete("/profile", authenticateUser, deletefunc);

module.exports = router;
