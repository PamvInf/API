const {Router} = require('express');
const { testsGet, testsPost, testsPut, testsDelete, testsPatch } = require('../controllers/test');

const router = Router ();

//Si quisieramos recoger el parámetro pasado por URL
//ponemos /:id (o nombre que queramos) y seguimos en el controller

router.get('/', testsGet);

router.put('/',testsPut);

router.post('/',testsPost);

router.delete('/',testsDelete);

router.patch('/', testsPatch);







module.exports = router;