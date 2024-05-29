var express = require('express');
var router = express.Router();
var mailboxController = require('../controllers/mailboxController.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ message: 'User not authenticated' });
    }
};
/*
 * GET
 */
router.get('/', mailboxController.list);
router.get('/create', mailboxController.showCreate);
router.get('/getUserHistory',  mailboxController.getUserHistory);
router.get('/getUserMailboxes',  mailboxController.getUserMailboxes);

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
