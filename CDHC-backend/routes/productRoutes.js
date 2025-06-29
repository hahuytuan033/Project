const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, adminMiddleware, ProductController.createProduct);
router.get('/', authMiddleware, ProductController.getAllProducts);
router.put('/:id', authMiddleware, adminMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, ProductController.deleteProduct);

module.exports = router;