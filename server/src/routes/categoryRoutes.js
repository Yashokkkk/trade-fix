'use strict';

const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', categoryController.findAll);
router.post('/', authMiddleware, categoryController.create);
router.delete('/:id', authMiddleware, categoryController.deleteById);

module.exports = router;
