const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, CustomerController.createCustomer);
router.get('/', authMiddleware, adminMiddleware, CustomerController.getAllCustomers);
router.put('/:id', /*authMiddleware, adminMiddleware,*/ CustomerController.updateCustomer);
router.delete('/:id', /*authMiddleware, adminMiddleware,*/ CustomerController.deleteCustomer);

module.exports = router;
