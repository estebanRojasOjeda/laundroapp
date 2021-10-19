const WashCycleController = require('../controller/wash.cicle.controller');
const { authenticate } = require('../configuration/jwt.config')

module.exports = (app) => {
    app.post('/api/wash-cycle', authenticate, WashCycleController.create);
    app.get('/api/wash-cycle', authenticate, WashCycleController.findAll);
    app.get('/api/wash-cycle/:id', authenticate, WashCycleController.findById);
    app.put('/api/wash-cycle/:id', authenticate, WashCycleController.update);
    app.delete('/api/wash-cycle/:id', authenticate, WashCycleController.delete);
}