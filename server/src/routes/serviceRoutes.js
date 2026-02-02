'use strict';

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, serviceController.create);
router.get('/', serviceController.findAll);
router.get('/:id', serviceController.findById);
router.put('/:id', authMiddleware, serviceController.updateById);
router.delete('/:id', authMiddleware, serviceController.deleteById);

module.exports = router;