const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const  jwt = require('jsonwebtoken');

 

const Test = require('../models/tests');
const { db } = require('../models/tests');


/*
const testsGet = async (req, res) => {


    const { id } = req.params; // obtener el id de usuario de la query de la petición GET
    
    try {
      const test = await Test.find({ usuario: id  }); // buscar el test correspondiente al usuario
      if (!test || test.length===0) {
        return res.status(404).json({ error: 'Test no encontrado' }); // devolver un error 404 si no se encuentra el test
      }
      res.json(test); // devolver los test encontrado
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' }); // devolver un error 500 si ocurre un error en el servidor
    }
  };
  */

  const getUserByToken = async (token) => {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  
    const usuario = await Usuario.findById(uid);
  
    if (!usuario) {
      throw new Error('Token no válido');
    }
  
    return usuario;
  }
  
  const testsGet = async (req, res) => {
    const token = req.header('x-token'); // obtener el token de la cabecera
  
    try {
      // verificar el token y obtener el usuario correspondiente
      //const usuario = await getUserByToken(token);
      
      
        const tests = await Test.find(); // obtener todos los tests
        res.json(tests);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' }); // devolver un error 500 si ocurre un error en el servidor
    }
  };
  
  

const testsPost = async(req, res = response) => {
    
    const { usuario, date, tipo, intentos, emotion, resultado } = req.body;
    const test = new Test ({ usuario, date, tipo, intentos, emotion, resultado } );
    


    // Guardar en BD
    await test.save();

    res.json({
        test
    });
}

const testsPut = async(req, res = response) => {

  
    res.json(test);
}

const testsPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - test'
    });
}

const testsDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const test = await Test.findByIdAndUpdate( id, { estado: false } );


    res.json(test);
}




module.exports = {
    testsGet,
    testsPost,
    testsPut,
    testsPatch,
    testsDelete,
}