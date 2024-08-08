const express = require('express');
const router = express.Router();
const interventionController = require('../controllers/intervention.controller');
const { authenticateToken} = require('../utilities');

router.post('/add-intervention', authenticateToken, interventionController.addIntervention);
router.get('/interventions', authenticateToken, interventionController.getInterventions);
router.get('/intervention/:id', authenticateToken, interventionController.getInterventionById);

module.exports = router;
