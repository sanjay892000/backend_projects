const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const router = express.Router();

const { createNote, getMyNote, publicNote, updateNote, deleteNote } = require('../controllers/note.controller')

router.post("/create", authenticateUser, createNote);

router.get("/mynotes", authenticateUser, getMyNote);

router.get("/public", publicNote);

router.put("/update/:noteId", authenticateUser, updateNote);

router.delete("/delete/:noteId", authenticateUser, deleteNote);

module.exports = router;
