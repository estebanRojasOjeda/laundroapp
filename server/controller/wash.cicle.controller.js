const washCycle = require("../model/washCycle.model");
const jwtConfig = require("../configuration/jwt.config");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err, decodedToken) => {
        if (!err) {
            const wash = [];
            wash.push({
                ...req.body,
                userId: decodedToken.id
            })
            washCycle.create(wash)
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
            washCycle.find({ state: 'IN_PROGRESS' }).populate('user').populate('customer')
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}

module.exports.findAllFinished = (req, res) => {
    jwt.verify(req.cookies.usertoken, jwtConfig.secret, (err) => {
        if (!err) {
            washCycle.find({ state: 'FINISHED' }).populate('user').populate('customer')
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
            washCycle.findById(req.params.id).populate('user')
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
            washCycle.findByIdAndUpdate(req.params.id, req.body)
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
            washCycle.findByIdAndDelete(req.params.id)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err))
        } else {
            res.status(401).json(err);
        }
    })
}