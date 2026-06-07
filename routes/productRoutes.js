const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', requireAuth, requireAdmin, productController.createProduct);
router.put('/:id', requireAuth, requireAdmin, productController.updateProduct);
router.delete('/:id', requireAuth, requireAdmin, productController.deleteProduct);

module.exports = router;
