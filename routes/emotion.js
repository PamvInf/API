const {Router} = require('express');
const { emotionsGet, emotionsPost, emotionsPut, emotionsDelete, emotionsPatch } = require('../controllers/emotion');

const router = Router ();

//Si quisieramos recoger el parámetro pasado por URL
//ponemos /:id (o nombre que queramos) y seguimos en el controller

router.get('/', emotionsGet);

router.put('/',emotionsPut);

router.post('/',emotionsPost);

router.delete('/',emotionsDelete);

router.patch('/', emotionsPatch);







module.exports = router;