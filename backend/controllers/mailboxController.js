var MailboxModel = require('../models/mailboxModel.js');
const User = require('../models/userModel.js');
var UserModel= require('../models/userModel.js');

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

    getUserHistory: async function (req, res) {
        console.log('Session User:', req.session.userId);  // Log the session user ID
        try {
            const userId = req.session.userId;
            if (!userId) {
                console.log('No user ID found in session.');
                return res.status(400).json({
                    message: 'User ID is required.'
                });
            }
    
            // Find mailboxes where the user is an owner and still has access
            const currentDate = new Date();
            const mailboxes = await MailboxModel.find({
                owners: {
                    $elemMatch: {
                        user: userId,
                        accessUntil: { $gt: currentDate }
                    }
                }
            });
    
            if (!mailboxes.length) {
                return res.status(404).json({
                    message: 'No mailboxes found for this user or access expired.'
                });
            }
    
            let userHistory = [];
            mailboxes.forEach(mailbox => {
                mailbox.usageHistory.forEach(history => {
                    if (history.user.toString() === userId) {
                        userHistory.push(history);
                    }
                });
            });
    
            return res.json(userHistory);
        } catch (err) {
            console.error('Error when getting user history:', err);  // Log the full error
            return res.status(500).json({
                message: 'Error when getting user history.',
                error: err.message  // Send the error message in the response
            });
        }
    },    

    addOwner: async function (req, res) {
        console.log('Inside addOwner function');
        try {
            const { username, id_pk, accessUntil } = req.body;
            console.log(`Received request to add owner: username=${username}, id_pk=${id_pk}, accessUntil=${accessUntil}`);

            if (!username || !id_pk || !accessUntil) {
                console.error('Invalid input data: username, id_pk, or accessUntil is missing');
                return res.status(400).json({ message: 'Invalid input data' });
            }

            // Find the user with the given username
            const user = await UserModel.findOne({ username: username });
            if (!user) {
                console.error('User not found for username:', username);
                return res.status(404).json({ message: 'User not found' });
            }

            // Find the mailbox with the given id_pk
            const mailbox = await MailboxModel.findOne({ id_pk: id_pk });
            if (!mailbox) {
                console.error('Mailbox not found for id_pk:', id_pk);
                return res.status(404).json({ message: 'Mailbox not found' });
            }

            // Add the new owner to the owners array
            mailbox.owners.push({
                user: user._id,
                accessUntil: new Date(accessUntil)
            });

            const updatedMailbox = await mailbox.save();
            console.log('Updated mailbox:', updatedMailbox);

            res.status(201).json({ message: 'Owner added successfully', mailbox: updatedMailbox });
        } catch (error) {
            console.error('Error adding owner:', error);
            res.status(500).json({ error: 'Failed to add owner' });
        }
    },
   
    checkUserAccess: async function (req, res) {
        console.log('Inside checkUserAccess function');
        try {
            const { userId, id_pk } = req.body;
            console.log(`Received request to check user access: userId=${userId}, id_pk=${id_pk}`);

            if (!userId || !id_pk) {
                console.error('Invalid input data: userId or id_pk is missing');
                return res.status(400).json({ message: 'Invalid input data' });
            }

            // Find the mailbox with the given id_pk
            const mailbox = await MailboxModel.findOne({ id_pk: id_pk });
            console.log('Mailbox found:', mailbox);

            if (!mailbox) {
                console.error('Mailbox not found for id_pk:', id_pk);
                return res.status(404).json({ message: 'Mailbox not found' });
            }

            // Check if the user is an owner and if they still have access
            const currentDate = new Date();
            const owner = mailbox.owners.find(owner => owner.user.toString() === userId && owner.accessUntil > currentDate);

            if (owner) {
                console.log('User has access to the mailbox:', owner);
                return res.json({ access: true });
            } else {
                console.log('User does not have access to the mailbox');
                return res.json({ access: false });
            }
        } catch (error) {
            console.error('Error checking user access:', error);
            res.status(500).json({ error: 'Failed to check user access' });
        }
    },



    getUserMailboxes: async function (req, res) {
        console.log('Session User:', req.session.userId);  // Log the session user ID
        try {
            const userId = req.session.userId;
            if (!userId) {
                console.log('No user ID found in session.');
                return res.status(400).json({
                    message: 'User ID is required.'
                });
            }
    
            // Find mailboxes where the user is an owner and still has access
            const currentDate = new Date();
            const mailboxes = await MailboxModel.find({
                owners: {
                    $elemMatch: {
                        user: userId,
                        accessUntil: { $gt: currentDate }
                    }
                }
            });
    
            if (!mailboxes.length) {
                return res.status(404).json({
                    message: 'No mailboxes found for this user or access expired.'
                });
            }
    
            console.log('Mailboxes found:', mailboxes);
            return res.json(mailboxes);
        } catch (err) {
            console.error('Error when getting user mailboxes:', err);  // Log the full error
            return res.status(500).json({
                message: 'Error when getting user mailboxes.',
                error: err.message  // Send the error message in the response
            });
        }
    },
    

   ///userid moremo spremenit v object id fix it or change model :()
 addUsageHistory : async (req, res) => {
    console.log('Inside addUsageHistory function');
    try {
        const { id_pk, userId, success } = req.body;
        console.log(`Received request to add usage history: id_pk=${id_pk}, userId=${userId}, success=${success}`);

        // Ensure id_pk and userId are present and valid
        if (!id_pk || !userId) {
            console.error('Invalid input data: id_pk or userId is missing');
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Find the mailbox with the given id_pk
        const mailbox = await MailboxModel.findOne({ id_pk: id_pk });
        console.log('Mailbox found:', mailbox);

        if (!mailbox) {
            console.error('Mailbox not found for id_pk:', id_pk);
            return res.status(404).json({ message: 'Mailbox not found' });
        }

        // Convert userId to ObjectId
        

        // Update the mailbox
        mailbox.usageHistory.push({
            user: userId,
            timestamp: new Date(),
            success: success
        });

        const updatedMailbox = await mailbox.save();
        console.log('Updated mailbox:', updatedMailbox);

        res.status(201).json({ message: 'Usage history added successfully', mailbox: updatedMailbox });
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
        console.log('Session User:', req.session.userId);
        try {
            // Izračunajte datum čez 999 let
            const accessUntilDate = new Date();
            accessUntilDate.setFullYear(accessUntilDate.getFullYear() + 999);
    
            const mailbox = new MailboxModel({
                id_pk: req.body.id_pk,
                location: req.body.location,
                size: req.body.size,
                accessCode: req.body.accessCode,
                owners: [{
                    user: req.session.userId,
                    accessUntil: accessUntilDate
                }]
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
