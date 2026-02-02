'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', authMiddleware, upload.single('image'), productController.create);
router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.put('/:id/image', authMiddleware, upload.single('image'), productController.uploadImage);
router.put('/:id', authMiddleware, upload.single('image'), productController.updateById);
router.delete('/:id', authMiddleware, productController.deleteById);

module.exports = router;