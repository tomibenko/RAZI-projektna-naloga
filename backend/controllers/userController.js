var UserModel = require('../models/userModel.js');
var bycrypt = require('bcrypt');

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
        try{
            const user = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            const savedUser = await user.save();
            //return res.redirect('/users/login');
            return res.status(201).json(user);
        }
        catch(err){
            return res.status(500).json({
                message: 'Error when creating user.',
                error: err
            });
        }
    },

    /**
     * userController.update()
     */
    update: async function (req, res) {
        try{
            var id = req.params.id;
            const user = await UserModel.findOne({_id: id}).exec();

            if(!user){
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;

            const updatedUser = await user.save();
            return res.json(updatedUser);

        }
        catch(err){
            return res.status(500).json({
                message: 'Error when updating user.',
                error: err
            });
        }
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

        try{
            const user = await UserModel.authenticate(req.body.username, req.body.password);
            req.session.userId = user._id;
            //return res.redirect('/users/profile');
            return res.json(user);
        }
        catch(err){
            const error = new Error('Wrong username or password');
            error.status = 401;
            return next(error);
        }
    },
    
    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    //return res.redirect('/');
                    return res.status(201).json({});
                }
            });
        }
    },

    profile: async function (req, res, next) {
        try{
            const user = await UserModel.findById(req.session.userId).exec();

            if(!user){
                const err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            }
            else{
                //return res.render('user/profile', user);
                return res.json(user);
            }
        }
        catch(err){
         return next(err);
        }
    }
};
