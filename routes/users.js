'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/user', (req, res, next) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Fallo al registrar al usuario' }).status(501);
        } else {
            res.json({ success: true, msg: 'Usuario registrado' }).status(201);
        }
    });
});

router.put('/user', function(req, res, next) {
    let newUser = new User(req.body)
        // newUser.updated_at = new Date()
    User.editUser(newUser, function(err, user) {
        if (err) {
            res.json({ success: false, msg: 'Fallo al actualizar al usuario' });
        } else {
            res.json({ success: true, msg: 'Usuario actualizado' });
        }
    });
})

router.get('/user/:id', function(req, res) {
    const id = req.params.id;
    User.getUserById(id, function(err, resource) {
        if (err) {
            return res.send(err).status(404);
        } else {
            res.json(resource).status(200);
        }
    })
})

router.get('/', function(req, res) {
    User.find(function(err, resource) {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(resource).status(200);
        }
    });
});

// Delete 
router.delete('/UsersDel/:id', (req, res, next) => {
    var id = req.params.id;
    User.remove({ _id: id }, function(err, resource) {
        if (err) {
            return res.send(err).status(501);
        } else {
            res.send(resource).status(201);
        }
    })
})



// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'Usuario no encontrado' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        _id: user._id,
                        id: user.id,
                        tip: user.tip,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        roles: {
                            sico: user.sico,
                            admon: user.admon,
                            super: user.super
                        },
                        act: user.act
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Password incorrecto' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;