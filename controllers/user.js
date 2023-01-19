const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/users');


const usersGet = (req,res = response ) => {
    
    res.json({
        msg: 'get API - Controller'
    });
}

const usersPost = async (req,res = response ) => {

    const {nombre, mail, password, role} = req.body;
    const usuario = new Usuario({nombre, mail, password, role});

    //Si quermos recoger el parametro pasado por URL seguimos lo dicho en routes
    //const id = req.params.id; (o el nombre que sea)
    

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    console.log(usuario);

    res.json({
       usuario
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}

const usersPatch = (req,res = response ) => {
    
    res.json({
        msg: 'patch API - Controller'
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}