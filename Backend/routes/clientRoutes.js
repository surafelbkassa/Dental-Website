const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/clients', clientController.addClient);
router.get('/clients', clientController.getClients);
router.get('/clients/:id', clientController.getClient);
router.post('/clients/:id/visits', clientController.addVisit);
router.post('/clients/:id/payments', clientController.addPayment);

// === NEW routes ===
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id', clientController.updateClient);

module.exports = router;
