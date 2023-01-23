const {response} = require('express');
//const {check} = require('express-validator');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/users.js');
const { generarJWT } = require('../helpers/generarJWT.js');



const login = async (req, res = response) =>{
    
    const { mail, password } = req.body;

    try{

        //Verificar si correo existe
        const usuario = await Usuario.findOne({mail});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario o correo son incorrectos'
            })
        }

        //Verificar si el user está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario no activo'
            })
        }

        //Verificar contraseña
        const validPass = bcryptjs.compareSync( password,usuario.password)
        if(!validPass){
            return res.status(400).json({
                msg:'Usuario o contraseña incorrecto'
            })
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })


    }catch(error){
        
        console.log(error);
        return res.status(200).json({
            msg: 'Error en el login'
        })
    }

   

}

module.exports = {
    login  
}