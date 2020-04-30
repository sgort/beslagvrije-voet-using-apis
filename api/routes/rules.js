const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RulesEngineController = require('../controllers/rules');

/**
 * GET (ie READ) a specific Rules Engine in the collection by `_id`
 */
router.get("/:referenceId", RulesEngineController.rulesengine_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of Rules Engine(s) in the collection
 * Login via JSON Web Token authorization is required!
 */
router.post("/insert", checkAuth, RulesEngineController.rulesengine_create_one);

module.exports = router;