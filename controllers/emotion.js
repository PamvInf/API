const { response, json } = require('express');
const { db } = require('../models/emotions');

const Emotion = require('../models/emotions');


const emotionsGet = async(req,res = response ) => {
    var num = parseInt(Math.random() * (4 - 0) +0);
    
    try {
        var data =  await db.collection('emotions').find({}).toArray();
        var dataName= data[num].nombre;
        var dataId=data[num]._id;
        res.json({
            dataName,
            dataId
        });
        
      }
      catch(err) {
        console.log(err);
      }

   
    
    
}

const emotionsPost = async (req,res = response ) => {

    const {nombre} = req.body;
    const emotion = new Emotion({nombre});

    //Si quermos recoger el parametro pasado por URL seguimos lo dicho en routes
    //const id = req.params.id; (o el nombre que sea)
    

    //Encriptar contraseña
   

    //Guardar en BD
    await emotion.save();

    console.log(emotion);

    res.json({
       emotion
    });
}

const emotionsPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    

    const emotion = await Emotion.findByIdAndUpdate( id, resto );

    res.json(emotion);
}

const emotionsDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const emotion = await emotion.findByIdAndDelete( id );

    const emotion = await emotion.findByIdAndUpdate( id, { estado: false } );


    res.json(emotion);
}

const emotionsPatch = (req,res = response ) => {
    
    res.json({
        msg: 'patch API - Controller'
    });
}


module.exports = {
    emotionsGet,
    emotionsPost,
    emotionsPut,
    emotionsDelete,
    emotionsPatch
}