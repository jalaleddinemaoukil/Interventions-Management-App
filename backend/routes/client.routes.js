const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const { authenticateToken} = require('../utilities');

router.post('/add-client', authenticateToken, clientController.addClient);
router.get('/clients', authenticateToken, clientController.getClients);
router.get('/client/:id', authenticateToken, clientController.getClientById);

module.exports = router;
