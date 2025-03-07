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
    res.send("send")
/*       await notesModel.create({title:title, description:description,createdBy:req.user, tag:tag, image:image})
    res.send({
        "status": 200,
        "message": "Notes Added Successfully",
    }) */
})
router.get('/getnotes', (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user.id;
    console.log(req.user, user)
    next();
}, async (req, res) => {
    console.log(req.user)
    let allNotes = await notesModel.find({ createdBy: req.user }).populate('createdBy')
    res.send({
        "status": 200,
        "message": "your notes",
        notes: allNotes
    })
})

module.exports = router;