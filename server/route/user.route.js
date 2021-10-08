const UserController = require('../controller/user.controller');
const {authenticate} = require('../configuration/jwt.config')

module.exports = (app) => {
    app.post('/api/user/register', UserController.register);
    app.post('/api/user/login', UserController.login);

    app.get('/api/user', authenticate, UserController.findAll);
    app.get('/api/user/:id', authenticate, UserController.findById);
    app.put('/api/user/:id', authenticate, UserController.update);
    app.delete('/api/user/:id', authenticate, UserController.delete);
}