const express = require('express');
const router = express.Router();
const isVerifyAuth = require('../middleware/isVerifyAuth');
const addPost = require('../controllers/wanderlust/addpost');
const getPost = require('../controllers/wanderlust/getpost');
const updatePost = require('../controllers/wanderlust/updatepost');
const deletePost = require('../controllers/wanderlust/deletepost');


router.post('/addpost', isVerifyAuth, addPost);
router.get('/getpost', isVerifyAuth, getPost);
router.put('/updatepost/:id', isVerifyAuth, updatePost);
router.delete('/deletepost/:id', isVerifyAuth, deletePost);

module.exports = router;