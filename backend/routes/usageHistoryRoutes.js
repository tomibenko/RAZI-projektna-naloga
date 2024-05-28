var express = require('express');
var router = express.Router();
var mailboxController = require('../controllers/mailboxController.js');

router.post('/usageHistory', mailboxController.addUsageHistory);

module.exports = router;