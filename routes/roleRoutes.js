const express = require('express');
const router = express.Router();
const { getRolesAPI } = require('../controllers/roleController');

router.get('/api/roles', getRolesAPI);

module.exports = router;
