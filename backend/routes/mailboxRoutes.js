var express = require('express');
var router = express.Router();
var mailboxController = require('../controllers/mailboxController.js');

/*
 * GET
 */
router.get('/', mailboxController.list);
router.get('/create', mailboxController.showCreate);
router.post('/api/usageHistory', mailboxController.addUsageHistory);

/*
 * GET
 */
router.get('/:id', mailboxController.show);

/*
 * POST
 */
router.post('/', mailboxController.create);

/*
 * PUT
 */
router.put('/:id', mailboxController.update);

/*
 * DELETE
 */
router.delete('/:id', mailboxController.remove);

module.exports = router;
