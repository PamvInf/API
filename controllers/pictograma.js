const { response, json } = require('express');
const { db } = require('../models/pictogramas');

const Pictograma = require('../models/pictogramas');

/////PICTOGRAMAS CAMBIAR

const  pictogramaGet = async(req,res = response ) => {
    const {emocion,sexo} = req.params;

    try {
        var data =  await db.collection('pictogramas').find({}, {"emocion": emocion});
        var dataRoute = data.ruta;
        var dataEmocion = data.emocion;

        res.json({
            dataEmocion,
            dataRoute
        });
        
      }
      catch(err) {
        console.log(err);
      }

   
    
    
}

const pictogramaPost = async (req,res = response ) => {

    var {emocion, sexo} = req.body;



    var ruta = '';
    sexo = sexo.toUpperCase();
    console.log(sexo);

    switch (sexo) {
        case 'MASC':
            ruta = `${emocion}_m.png`
            break;
        case 'FEM':
            ruta = `${emocion}_f.png`
            break;
    
        default:
            break;
    }
    

    const pictograma = new Pictograma({emocion,sexo,ruta});

    //Si quermos recoger el parametro pasado por URL seguimos lo dicho en routes
    //const id = req.params.id; (o el nombre que sea)
    

    //Encriptar contraseña
   

    //Guardar en BD
    await pictograma.save();

    console.log(pictograma);

    res.json({
       pictograma
    });
}

const pictogramaPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    

    const pictograma = await Pictograma.findByIdAndUpdate( id, resto );

    res.json(pictograma);
}

const pictogramaDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const emotion = await emotion.findByIdAndDelete( id );

    const pictograma = await pictograma.findByIdAndUpdate( id);


    res.json(pictograma);
}

const pictogramaPatch = (req,res = response ) => {
    
    res.json({
        msg: 'patch API - Controller'
    });
}


module.exports = {
    pictogramaGet,
    pictogramaPost,
    pictogramaPut,
    pictogramaDelete,
    pictogramaPatch
}