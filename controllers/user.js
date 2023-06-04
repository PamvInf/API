const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/users');
const  jwt  = require('jsonwebtoken');

const usersGet = async (req, res = response) => {
    try {
      const { id } = req.query; // Obtiene el ID del usuario desde los parámetros de consulta de la URL
      const usuario = await Usuario.findById(id); // Busca el usuario por su ID en la base de datos
  
      if (!usuario) {
        return res.status(404).json({
          msg: 'Usuario no encontrado',
        });
      }
  
      // Si el usuario existe, se envían todos los datos del usuario
      res.json({
        usuario,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error en el servidor',
      });
    }
  };
  

const usersPost = async (req,res = response ) => {

    const {nombre, mail, password, role,edad} = req.body;
    const usuario = new Usuario({nombre, mail, password, role,edad});

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
    const { _id, password, google, mail, ...resto } = req.body;

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

    // Si quisieramos fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    const usuarioAuth = req.usuario;
   


    res.status(200).json({usuario,usuarioAuth});
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