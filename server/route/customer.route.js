const CustomerController = require('../controller/customer.controller');
const {authenticate} = require('../configuration/jwt.config');

module.exports = (app) => {
    app.post('/api/customer', authenticate, CustomerController.create);
    app.get('/api/customer', authenticate, CustomerController.findAll);
    app.get('/api/customer/:id', authenticate, CustomerController.findById);
    app.put('/api/customer/:id', authenticate, CustomerController.update);
    app.delete('/api/customer/:id', authenticate, CustomerController.delete);
} 