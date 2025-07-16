const express = require('express');
const router = express.Router();
const isVerifyAuth = require('../middleware/isVerifyAuth');
const addPost = require('../controllers/wanderlust/addpost');
const getPost = require('../controllers/wanderlust/getpost');
const updatePost = require('../controllers/wanderlust/updatepost');
const deletePost = require('../controllers/wanderlust/deletepost');
const likepost = require('../controllers/wanderlust/likepost');
const commentPost = require('../controllers/wanderlust/commentpost');
const upload = require('../middleware/multer');
const yourPost = require('../controllers/wanderlust/yourpost');

router.post('/addpost', isVerifyAuth, upload.single('image'), addPost);
router.get('/getpost', getPost);
router.get('/yourpost', isVerifyAuth, yourPost);
router.put('/updatepost/:id', isVerifyAuth, updatePost);
router.put('/likepost/:postid', isVerifyAuth, likepost);
router.post('/comment/:postid', isVerifyAuth, commentPost);
router.delete('/deletepost/:id', isVerifyAuth, deletePost);

module.exports = router;