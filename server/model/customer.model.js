const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "El nombre del cliente es requerido"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido del cliente es requerido"]
    },
    identification: {
        type: Number,
        required: [true, "El Rut del cliente es requerido"]
    },
    dv: Number,
    numberPhone: {
        type: Number,
        required: [true, "El número del cliente es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo de la persona es requerido"],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "Correo invalido"]

    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;