const {Router} = require('express');

const {validarJWT} = require('../middlewares/validar-jwt');
const { isAdmin } = require('../middlewares/validar-rol');

const { usersGet,
        usersPost,
        usersPut,
        usersDelete,
        usersPatch } = require('../controllers/user');

const router = Router ();

//Si quisieramos recoger el parámetro pasado por URL
//ponemos /:id (o nombre que queramos) y seguimos en el controller

router.get('/', usersGet);

router.put('/',usersPut);

router.post('/',usersPost);

router.delete('/:id',[
    validarJWT,
    isAdmin,
],usersDelete);

router.patch('/', usersPatch);







module.exports = router;