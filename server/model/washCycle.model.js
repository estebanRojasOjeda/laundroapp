const mongoose = require("mongoose");

const WashCycleSchema = mongoose.Schema({
    customer: [{
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
    }],
    charge: {
        type: Number,
        required: [true, "El numero de cargas es requerido"],
        minlength: [1, "Debe ingresar al menos un ciclo"]
    },
    state: Number,
    user:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

WashCycleSchema.pre('save', function(next){
    now = new Date();
    this.date = now;
    next();
});