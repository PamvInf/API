const express = require('express');

const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app            = express();
        this.port           = process.env.PORT;
        this.userPath       = '/api/users';
        this.emotionPath    = '/api/emotions';
        this.testPath       = '/api/tests';
        this.pictogramaPath = '/api/pictogramas';
        this.authPath       = '/api/auth';


        // Conectar a la DB
        this.conectarDB();
        


        //Middlewares
        this.middlewares();
        

        //rutas de la app
        this.routes();
    }

    async conectarDB(){
        
        await dbConnection();

    }

    
    middlewares() {

        //CORS
        this.app.use( cors() );

        //parseo del body
        this.app.use( express.json()); 

        //directorio publico
        this.app.use(express.static('public'));
    }



    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.emotionPath, require('../routes/emotion'));
        this.app.use(this.testPath, require('../routes/test'));
        this.app.use(this.pictogramaPath, require('../routes/pictograma'));


    }


    listen() {
        this.app.listen(this.port, () =>{
            console.log('Server corriendo en el puerto',this.port );
        });
    }
}

module.exports = Server;