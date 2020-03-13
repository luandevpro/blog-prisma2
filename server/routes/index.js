const express = require('express');
router = express.Router();
const homeController = require('../controllers/home.controller');
const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

router.route('/').get(homeController.home);

router.route('/getPost/:id').get(postController.getPost);
router.route('/getPosts').get(postController.getPosts);
router.route('/createPost').post(postController.createPost);
router.route('/updatePost/:id').post(postController.updatePost);
router.route('/post/:id').get(postController.deletePost);

router.route('/getUser/:id').get(userController.getUser);
router.route('/getUsers').get(userController.getUsers);
router.route('/createUser').post(userController.createUser);
router.route('/user/:id').get(userController.deleteUser);

module.exports = router;
