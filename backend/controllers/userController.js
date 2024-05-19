var UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: async function (req, res) {
        try {
            var id = req.params.id;
            const user = await UserModel.findOne({_id: id});
            
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
    
            return res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting user.',
                error: err
            });
        }
    },
    
    /**
     * userController.create()
     */
    create: async function (req, res) {
        try {
            var user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            const savedUser = await user.save();

            //return res.status(201).json(savedUser);
            return res.redirect('/users/login');
        } catch (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showLogin: function (req, res) {
        res.render('user/login');
    },

    showRegister: function (req, res) {
        res.render('user/register');
    },

    login: async function (req, res, next) {
        try {
            const user = await UserModel.authenticate(req.body.username, req.body.password);
            req.session.userId = user._id;
            return res.redirect('/users/profile');
        } catch (error) {
            var err = new Error('Wrong username or password.');
            err.status = 401;
            return next(err);
        }
    },
    
    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    },

    profile: function (req, res, next) {
        UserModel.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.render('user/profile', user);
                }
            }
        });
    }
};
