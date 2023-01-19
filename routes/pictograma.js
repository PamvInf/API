const {Router} = require('express');
const { pictogramaGet, pictogramaPost, pictogramaPut, pictogramaDelete, pictogramaPatch } = require('../controllers/pictograma');

const router = Router ();

//Si quisieramos recoger el parámetro pasado por URL
//ponemos /:id (o nombre que queramos) y seguimos en el controller

router.get('/', pictogramaGet);

router.put('/',pictogramaPut);

router.post('/',pictogramaPost);

router.delete('/',pictogramaDelete);

router.patch('/', pictogramaPatch);







module.exports = router;