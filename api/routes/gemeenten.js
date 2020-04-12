const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const GemeenteController = require('../controllers/gemeente');

/**
 * GET (ie READ) all gemeenten in the collection
 * No login required!
 */
router.get("/", GemeenteController.gemeente_list);

/**
 * GET (ie READ) a specific gemeente in the collection by `GemeentecodeGM`
 * No login required!
 */
router.get("/:gemeenteId", GemeenteController.gemeente_find_one);

/**
 * POST (ie CREATE) a single and/or a serie of gemeenten in the collection
 * Login via JSON Web Token authorization is required!
 */
router.post("/insert", checkAuth, GemeenteController.gemeente_create_one);

/**
 * PATCH (ie UPDATE) a specific gemeente in the collection by `GemeentecodeGM`
 * Can handle incomplete set of properties
 * Login via JSON Web Token authorization is required!
 */
router.patch("/:gemeenteId", checkAuth, GemeenteController.gemeente_update_one);

/**
 * DELETE a specific gemeente in the collection by `GemeentecodeGM`
 * Login via JSON Web Token authorization is required!
 */
router.delete("/:gemeenteId", checkAuth, GemeenteController.gemeente_delete_one);

module.exports = router;