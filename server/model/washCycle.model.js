const mongoose = require("mongoose");

const WashCycleSchema = mongoose.Schema({
    charge: {
        type: Number,
        required: [true, "El numero de cargas es requerido"],
        minlength: [1, "Debe ingresar al menos un ciclo"]
    },
    amount: {
        type: Number,
        required: [true, "El monto por carga de ropa es requerido"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'El cliente es requerido']
    },
    date: Date,
    state: Number,
    totalAmount: Number
});

WashCycleSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

WashCycleSchema.virtual('customer', {
    ref: 'Customer',
    localField: 'customerId',
    foreignField: '_id'
});

WashCycleSchema.pre('save', function (next) {
    now = new Date();
    this.date = now;
    this.state = 'IN_PROGRESS';
    this.totalAmount = this.charge * this.amount;
    next();
});

WashCycleSchema.set('toObject', { virtuals: true });
WashCycleSchema.set('toJSON', { virtuals: true });

const WashCycle = mongoose.model('WashCycle', WashCycleSchema);
module.exports = WashCycle;