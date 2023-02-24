const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Test = require('../models/tests');
const { db } = require('../models/tests');



const testsGet = async(req = request, res = response) => {

    res.json({
        msg: 'API - GET Test'
    });
}

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