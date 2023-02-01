const {response} = require("express");



const isAdmin = (req, res = response, next) =>{

    if(!req.usuario){
        res.status(500).json({
            error:'Verificación sin validación del token'
        })
    }
    
    const {role, nombre} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        res.status(401).json({
            error:`${nombre} no es Admin`
        })
    }
    next(); 
}





module.exports ={
    isAdmin
}