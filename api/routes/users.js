const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');

/**
 * GET (ie READ) list of all users in the collection
 */
router.get("/", UserController.user_list);

/**
 * GET (ie READ) a specific user in the collection
 */
router.get("/:userId", UserController.user_find_one);

/**
 * POST (ie CREATE) a new user in the collection
 */
router.post("/signup", UserController.user_signup);

/**
 * POST (ie CREATE) a token for the user to authenticate use of the API's with protected routes
 */
router.post("/login", UserController.user_login);

/**
 * DELETE a specific user from the collection
 */
router.delete("/:userId", UserController.user_delete );


module.exports = router;

