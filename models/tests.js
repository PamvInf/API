
const { Schema, model, default: mongoose } = require('mongoose');



const TestSchema = Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now,
        required: [true, 'Debe tener una fecha'],
    },
    tipo: {
        type: String,
        required: true,
        emun: ['RECONGNIZE', 'PICTO', 'PHOTO']
    },
    intentos:{
        type: Number,
        required:[true, 'Debe haber realizado algun intento']
    },
    resultado:{
        type: String,
        enum:["WIN","LOSE"],
        required: true

    },
    emotion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Emotion',
        required:true
        }
});



TestSchema.methods.toJSON = function() {
    const { __v, password, ...test  } = this.toObject();
    return test;
}

module.exports = model( 'Test', TestSchema );
