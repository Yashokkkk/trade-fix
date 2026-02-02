'use strict';

const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', requestController.create);
router.get('/', authMiddleware, requestController.findAll);
router.get('/:id', authMiddleware, requestController.findById);
router.put('/:id', authMiddleware, requestController.updateById);
router.delete('/:id', authMiddleware, requestController.deleteById);

module.exports = router;