const {Router} = require('express');
const { situacionesGet, situacionesPost, situacionesPut, situacionesDelete, situacionesPatch } = require('../controllers/situacion');

const router = Router ();

//Si quisieramos recoger el parámetro pasado por URL
//ponemos /:id (o nombre que queramos) y seguimos en el controller

router.get('/', situacionesGet);

router.put('/',situacionesPut);

router.post('/',situacionesPost);

router.delete('/',situacionesDelete);

router.patch('/', situacionesPatch);







module.exports = router;