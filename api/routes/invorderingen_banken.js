const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const InvorderingBankenController = require('../controllers/invordering_banken');

/**
 * GET (ie READ) all invorderingen in the collection
 * Login via JSON Web Token authorization is required!
 */
router.get("/", /*checkAuth,*/ InvorderingBankenController.invordering_list);

/**
 * GET (ie READ) all base records invorderingen in the collection
 * Login via JSON Web Token authorization is required!
 */
router.get("/base-records", /*checkAuth,*/ InvorderingBankenController.invordering_list_base_records);

/**
 * GET (ie READ) a specific invordering in the collection by `_id`
 * Login via JSON Web Token authorization is required!
 */
router.get("/:invorderingId", /*checkAuth,*/ InvorderingBankenController.invordering_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of gemeenten in the collection
 * Login via JSON Web Token authorization is required! <-- disabled for demonstration purposes
 */
router.post("/insert", /*checkAuth,*/ InvorderingBankenController.invordering_create_one);

/**
 * PATCH (ie UPDATE) a specific invordering in the collection by `invorderingId`
 * Can handle incomplete set of properties
 * Login via JSON Web Token authorization is required!
 */
router.patch("/:invorderingId", checkAuth, InvorderingBankenController.invordering_update_one);

/**
 * DELETE a specific invordering in the collection by invorderingId
 * Login via JSON Web Token authorization is required!
 */
router.delete("/:invorderingId", /*checkAuth,*/ InvorderingBankenController.invordering_delete_one);

/**
 * DELETE all non base records from the collection
 * Login via JSON Web Token authorization is required!
 */
router.delete("/", /*checkAuth,*/ InvorderingBankenController.invordering_delete_non_base_records);

module.exports = router;