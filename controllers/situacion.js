const { response, json } = require('express');
const { db } = require('../models/situaciones');

const Situacion = require('../models/situaciones');


const situacionesGet = async(req,res = response ) => {
    var num = parseInt(Math.random() * (14 - 0) +0);
    
    try {
        var data =  await db.collection('situacions').find({}).toArray();
        console.log(data);
        var datasituacion= data[num].contenido;
        var dataId=data[num]._id;
        var dataEmo=data[num].emocion;
        var dataImg=data[num].img;
        var dataEmoId=data[num].emotionId;
        res.json({
            datasituacion,
            dataId,
            dataEmo,
            dataImg,
            dataEmoId
        });
        
      }
      catch(err) {
        console.log(err);
      }

   
    
    
}

const situacionesPost = async (req,res = response ) => {


    const {emocion, contenido} = req.body;
    const situacion = new Situacion({emocion,contenido});

    //Si quermos recoger el parametro pasado por URL seguimos lo dicho en routes
    //const id = req.params.id; (o el nombre que sea)
    

    //Encriptar contraseña
   

    //Guardar en BD
    await situacion.save();

    console.log(situacion);

    res.json({
       situacion
    });
}

const situacionesPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    

    const situacion = await Situacion.findByIdAndUpdate( id, resto );

    res.json(situacion);
}

const situacionesDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const situacion = await Situacion.findByIdAndDelete( id );

    const situacion = await Situacion.findByIdAndUpdate( id, { estado: false } );


    res.json(situacion);
}

const situacionesPatch = (req,res = response ) => {
    
    res.json({
        msg: 'patch API - Controller'
    });
}


module.exports = {
    situacionesGet,
    situacionesPost,
    situacionesPut,
    situacionesDelete,
    situacionesPatch
}