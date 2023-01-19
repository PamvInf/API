const { Schema, model} = require('mongoose');

const PictogramaSchema = Schema({
    emocion:{ 
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    ruta:{
        type: String,
        //required: [true, 'Es obligatoria la ruta']

    },
    sexo:{
        type: String,
        enum : ['MASC','FEM']
    }

});


PictogramaSchema.methods.toJson = function(){
    const { __v,...pictograma} = this.toObject();
    return pictograma;
}

module.exports = model('Pictograma', PictogramaSchema);