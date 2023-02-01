const {response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario= require('../models/users');


const validarJWT = async (req = request, res =  response, next) =>{

    const token = req.header('x-token');

    console.log(token);

    if(!token){
    return res.status(401).json({
        error: 'No hay token en la petición'
        });
    }

    try{


        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario 
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                error:'El usuario no existente'
            })
        }

        //Hay que comprobar si el user ya esta borrado
        if(usuario.estado == false){
            return res.status(401).json({
                error:'El usuario no es accesible'
            })
        }

        
        req.usuario = usuario;

        
    
        next();

    }catch(error){
        console.log(error)
        return res.status(401).json({
            error: 'Token no válido'
            });
        
    }
    
    
     



}

module.exports = {
    validarJWT

}