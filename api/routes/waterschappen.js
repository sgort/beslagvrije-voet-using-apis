const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const WaterschapController = require('../controllers/waterschap');

/**
 * GET (ie READ) all waterschappen in the collection
 * No login required!
 */
router.get("/", WaterschapController.waterschap_list);

/**
 * GET (ie READ) a specific waterschap in the collection by `WaterschapKey`
 * No login required!
 */
router.get("/:waterschapId", WaterschapController.waterschap_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of waterschappen in the collection
 * Login via JSON Web Token authorization is required!
 */
router.post("/insert", checkAuth, WaterschapController.waterschap_create_one);

/**
 * PATCH (ie UPDATE) a specific waterschap in the collection by `WaterschapKey`
 * Can handle incomplete set of properties
 * Login via JSON Web Token authorization is required!
 */
router.patch("/:waterschapId", checkAuth, WaterschapController.waterschap_update_one);

/**
 * DELETE a specific waterschap in the collection by `WaterschapKey`
 * Login via JSON Web Token authorization is required!
 */
router.delete("/:waterschapId", checkAuth, WaterschapController.waterschap_delete_one);

module.exports = router;