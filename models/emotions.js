const { Schema, model} = require('mongoose');

const EmotionSchema = Schema({
    nombre:{ 
    type: String,
    required: [true, 'El nombre es obligatorio']
    }

});


EmotionSchema.methods.toJson = function(){
    const { __v,...emotion} = this.toObject();
    return emotion;
}

module.exports = model('Emotion', EmotionSchema);