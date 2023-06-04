const { Schema, model,default: mongoose } = require('mongoose');

const SituacionSchema = Schema({
    emocion:{ 
    type: String,
    required: [true, 'La emocion es obligatoria']
    },
    contenido:{ 
        type: String,
        required: [true, 'La situacion es obligatoria']
        },
    img:{
        type: String,
        required: [true, 'La imagen es obligatoria']
    },
    emotionId:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'La id de la emocion es obligatoria']
    },

});


SituacionSchema.methods.toJson = function(){
    const { __v,...situacion} = this.toObject();
    return situacion;
}

module.exports = model('Situacion', SituacionSchema);