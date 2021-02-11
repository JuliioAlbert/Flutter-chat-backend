/*
  path: api/login
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken} = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
  check('password', 'La Contraseña es Obligatoria').not().isEmpty(),
  check('email', 'El Correo es Obligatorio').isEmail(),
  validarCampos
], crearUsuario);

router.post('/', [
  check('email', 'El Email es Obligatorio').isEmail(),
  check('password', 'El Password es Obligatorio').not().isEmpty(),
  validarCampos
], login);

//validarJWT, 
router.get('/renew', validarJWT, renewToken);



module.exports = router;
