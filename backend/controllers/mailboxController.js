var MailboxModel = require('../models/mailboxModel.js');

/**
 * mailboxController.js
 *
 * @description :: Server-side logic for managing mailboxs.
 */
module.exports = {

    /**
     * mailboxController.list()
     */
    list: async function (req, res) {
        try {
            const mailboxs = await MailboxModel.find();
            return res.json(mailboxs);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting mailbox.',
                error: err
            });
        }
    },

    /**
     * mailboxController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        MailboxModel.findOne({_id: id}, function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mailbox.',
                    error: err
                });
            }

            if (!mailbox) {
                return res.status(404).json({
                    message: 'No such mailbox'
                });
            }

            return res.json(mailbox);
        });
    },

    /**
     * mailboxController.create()
     */
    create: function (req, res) {
        var mailbox = new MailboxModel({
			location : req.body.location,
			status : req.body.status,
			size : req.body.size,
			owner : req.body.owner,
			accessCode : req.body.accessCode,
			installationDate : req.body.installationDate,
			usageHistory : req.body.usageHistory,
			batteryStatus : req.body.batteryStatus
        });

        mailbox.save(function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating mailbox',
                    error: err
                });
            }

            //return res.status(201).json(mailbox);
            return res.redirect('/mailboxes/list');
        });
    },

    /**
     * mailboxController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        MailboxModel.findOne({_id: id}, function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting mailbox',
                    error: err
                });
            }

            if (!mailbox) {
                return res.status(404).json({
                    message: 'No such mailbox'
                });
            }

            mailbox.location = req.body.location ? req.body.location : mailbox.location;
			mailbox.status = req.body.status ? req.body.status : mailbox.status;
			mailbox.size = req.body.size ? req.body.size : mailbox.size;
			mailbox.owner = req.body.owner ? req.body.owner : mailbox.owner;
			mailbox.accessCode = req.body.accessCode ? req.body.accessCode : mailbox.accessCode;
			mailbox.installationDate = req.body.installationDate ? req.body.installationDate : mailbox.installationDate;
			mailbox.usageHistory = req.body.usageHistory ? req.body.usageHistory : mailbox.usageHistory;
			mailbox.batteryStatus = req.body.batteryStatus ? req.body.batteryStatus : mailbox.batteryStatus;
			
            mailbox.save(function (err, mailbox) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating mailbox.',
                        error: err
                    });
                }

                return res.json(mailbox);
            });
        });
    },

    /**
     * mailboxController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        MailboxModel.findByIdAndRemove(id, function (err, mailbox) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the mailbox.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showCreate: function (req, res) {
        return res.render('mailbox/create');
    }
};
