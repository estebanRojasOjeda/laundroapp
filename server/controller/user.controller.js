const User = require("../model/user.model");
const jwtConfig = require('../configuration/jwt.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.register = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                User.create(req.body)
                    .then(user => res.json(user))
                    .catch(errors => {
                        res.status(500).json(errors)
                    });
            } else {
                res.status(500).json({
                    errors: {
                        email: {
                            name: 'ValidatorError',
                            message: 'El correo ya se encuentra registrado'
                        }
                    }
                })
            }
        });
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(resp => {
            if (resp) {
                bcrypt.compare(req.body.pass, resp.pass)
                    .then(valid => {
                        if (valid) {
                            const payload = {
                                id: resp._id,
                                firstName: resp.firstName,
                                lastName: resp.lastName,
                                email: resp.email,
                                rol: resp.rol
                            };
                            const newToken = jwt.sign(payload, jwtConfig.secret);
                            res.cookie("usertoken", newToken, jwtConfig.secret, { httpOly: true })
                                .json({ success: true, user: payload });
                        } else {
                            res.status(500).json({ message: "Contraseña invalida" });
                        }
                    })
            } else {
                res.status(500).json({ message: "El usuario no existe" });
            }
        })
}

module.exports.findAll = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            User.find({})
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}

module.exports.findById = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            User.findById(req.params.id)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}

module.exports.update = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            User.findByIdAndUpdate(req.params.id, req.body)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}

module.exports.delete = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            User.findByIdAndDelete(req.params.id)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}