const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "El nombre de la persona es requerido"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido de la persona es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo de la persona es requerido"],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "Correo invalido"]
    },
    rol: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: [true, "La contraseña es requerida"],
        minlength: [6, "La contraseña debe tener 6 caracteres"]
    }
},
    { timestamps: true });

UserSchema.virtual('confirmPass')
    .get(() => this._confirmPass)
    .set(value => this._confirmPass = value);

UserSchema.pre('validate', function (next) {
    if (this.pass !== this.confirmPass) {
        this.invalidate('confirmPass', 'Las contraseñas deben coincidir');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.pass, 10)
        .then(hash => {
            this.pass = hash;
            next();
        })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;