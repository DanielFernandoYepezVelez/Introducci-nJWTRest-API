const { Router } =require('express');
const jwt = require('jsonwebtoken');
const router = Router();

const User = require('../../models/user.js');
const config = require('../../config.js');
const verifyToken = require('./verifyToken.js');

/* RUTA DEL REGISTRO DE USUARIOS */
router.post('/signup', async(req, res, next) => {
  const { username, email, password } = req.body;
  
  const user = new User({
    username,
    email,
    password
  });
  user.password = await user.encryptPassword(user.password);
  await user.save();

  const token = jwt.sign({id: user._id}, config.secret, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({message: 'Autorizado Correctamente', token});
});

/* RUTA DE AUTORIZACION AL SISTEMA */
router.get('/me', verifyToken, async(req, res, next) => {
  // Lo pase a otro archivo para aplicarlo a todas las rutas
  // const token = req.headers['x-access-token'];
  // if(!token) {
  //   return res.status(401).json({
  //     message: "No Tiene Autorización Actualmente por falta de un TOKEN"
  //   })
  // }
  // const decode = jwt.verify(token, config.secret);
  // console.log(decode);
  // const userID = await User.findById(decode.id, {password: 0});

  const userID = await User.findById(req.userID, { password: 0 });
  if(!userID) {
    return res.status(404).json({
      message: 'El usuario no se encuentra en la DB'
    });
  }

  res.json(userID);
  // res.json({message: 'me'});
});

router.post('/signin', async(req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);

  const user = await User.findOne({email});
  if(!user){
    return res.status(404).json({message: "El email no existe"});
  }

  /* Me devuelve un valor booleano */
  const passwordIsValidate = await user.validatePassword(password);
  // console.log(passwordIsValidate);

  if(!passwordIsValidate){
    return res.status(404).json({message: 'Las contraseñas no coinciden'});
  }

  const token = jwt.sign({id: user._id}, config.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({message: 'El usuario Inicio Sesión Correctamente', token});
});

module.exports = router;