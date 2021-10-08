const Customer = require("../model/customer.model");
const jwtConfig = require("../configuration/jwt.config");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            const customer = req.body;
            Customer.create(customer)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}

module.exports.findAll = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            Customer.find()
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
            Customer.findById(req.params.id)
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
            Customer.findByIdAndUpdate(req.params.id, req.body)
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
            Customer.findByIdAndDelete(req.params.id)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}