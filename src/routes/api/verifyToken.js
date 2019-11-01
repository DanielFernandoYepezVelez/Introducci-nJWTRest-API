const jwt = require('jsonwebtoken');
const config = require('../../config.js');

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if(!token) {
    return res.status(401).json({
      message: "No Tiene Autorización Actualmente por falta de un TOKEN"
    })
  }

  const decode = jwt.verify(token, config.secret);
  // console.log(decode);
  req.userID = decode.id; //Puedo pasar el id del usuario entre todos los req existentes
  next();
}

module.exports = verifyToken;