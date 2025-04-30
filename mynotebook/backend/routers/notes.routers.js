const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const notesModel = require('../schemas/notes.model')
const upload = require('../middleware/multer')
const verifyUsers = require('../middleware/user.verification')
const JWT_SECRET = 'crimepatrol';

router.post('/addnotes', verifyUsers, upload.single("image"), async (req, res) => {
    const { title, description, tag } = req.body;
    image = req.file ? req.file.filename : null;
    console.log(req.file)
    await notesModel.create({ title: title, description: description, createdBy: req.user, tag: tag, image: image })
    res.send({
        "status": 200,
        "message": "Notes Added Successfully",
    })
})
router.get('/getnotes', verifyUsers, async (req, res) => {
    console.log(req.user)
    /*  let allNotes = await notesModel.find({ createdBy: req.user }).populate('createdBy') */
    try {
        let allNotes = await notesModel.find({ createdBy: req.user })
        res.send({
            "status": 200,
            "message": "your notes",
            notes: allNotes
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;