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
    addUsageHistory: async function (req, res) {
        try {
            const { id_pk, userId, success, scanResult } = req.body;

            // Update the mailbox with the given id_pk
            const mailbox = await MailboxModel.findOneAndUpdate(
                { id_pk: id_pk },
                { $push: { usageHistory: { user: userId, timestamp: new Date(), success: success, scanResult: scanResult } } },
                { new: true } // Return the modified document
            );

            if (!mailbox) {
                return res.status(404).json({
                    message: 'Mailbox not found'
                });
            }

            res.status(201).json({ message: 'Usage history added successfully' });
        } catch (error) {
            console.error('Error updating usage history:', error);
            res.status(500).json({ error: 'Failed to update usage history' });
        }
    },
    /**
     * mailboxController.show()
     */
    show: async function (req, res) {
        try {
            const id = req.params.id;
            const mailbox = await MailboxModel.findOne({ _id: id });
    
            if (!mailbox) {
                return res.status(404).json({
                    message: 'No such mailbox'
                });
            }
    
            return res.json(mailbox);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting mailbox.',
                error: err
            });
        }
    },    

    /**
     * mailboxController.create()
     */
    create: async function (req, res) {
        try {
            const mailbox = new MailboxModel({
                id_pk: req.body.id_pk,
                location: req.body.location,
                size: req.body.size,
                accessCode: req.body.accessCode,
            });
    
            const savedMailbox = await mailbox.save();
            return res.redirect('/mailboxes');
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating mailbox',
                error: err
            });
        }
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
