const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CredentialController = require('../controllers/credential');

/**
 * GET (ie READ) all credentials in the collection
 * Login via JSON Web Token authorization is required! << temporarily disabled for demo purposes
 */
router.get("/", /*checkAuth,*/ CredentialController.credential_list);

/**
 * GET (ie READ) a specific credential in the collection by `_id`
 * Login via JSON Web Token authorization is required!
 */
router.get("/:credentialId", checkAuth, CredentialController.credential_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of credentials in the collection
 * Login via JSON Web Token authorization is required!
 */
router.post("/insert", /*checkAuth,*/ CredentialController.credential_create_one);

/**
 * PATCH (ie UPDATE) a specific credential in the collection by `credentialId`
 * Can handle incomplete set of properties
 * Login via JSON Web Token authorization is required! << temporarily disabled for demo purposes
 */
router.patch("/:credentialId", /*checkAuth,*/ CredentialController.credential_update_one);

/**
 * DELETE a specific credential in the collection by credentilId
 * Login via JSON Web Token authorization is required!
 */
router.delete("/:credentialId", checkAuth, CredentialController.credential_delete_one);

module.exports = router;