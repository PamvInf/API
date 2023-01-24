const {response, request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request, res =  response, next) =>{

    const token = req.header('x-token');

    console.log(token);

    if(!token){
    return res.status(401).json({
        error: 'No hay token en la petición'
        });
    }

    try{
        jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    
    next();
    }catch{
        return res.status(401).json({
            error: 'Token no válido'
            });
        
    }
    
    
     



}

module.exports = {
    validarJWT

}