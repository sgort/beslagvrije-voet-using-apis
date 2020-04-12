const express = require('express');
const router = express.Router();
const inschrijvingbrp_Controller = require('../controllers/inschrijvingbrp');

/**
 * GET request for finding BSN via Haal Centraal BRP API
 */
router.get('/:BSN', inschrijvingbrp_Controller.inschrijvingbrp_find_one);

module.exports = router;