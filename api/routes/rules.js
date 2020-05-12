const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const RulesEngineController = require('../controllers/rules');


/**
 * GET (ie READ) all Rules Engine in the collection
 */
router.get("/", RulesEngineController.rulesengine_list_all);

/**
 * GET (ie READ) latest specific Rules Engine in the collection by 'reference'
 */
router.get("/:domainRef", RulesEngineController.rulesengine_list);

/**
 * GET (ie READ) a specific Rules Engine in the collection by `reference`
 */
router.get("/:rulesId", RulesEngineController.rulesengine_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of Rules Engine(s) in the collection
 * Login via JSON Web Token authorization is required!
 */
router.post("/insert", /*checkAuth,*/ RulesEngineController.rulesengine_create_one);

/**
 * PATCH (ie UPDATE) a specific rules in the collection
 */
router.patch("/:rulesId", RulesEngineController.rulesengine_update_one);

/**
 * DELETE a specific rules from the collection
 */
router.delete("/:rulesId", RulesEngineController.rulesengine_delete_one );


module.exports = router;