const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.methods.encryptPassword = async(password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); //con este this hago referencia al password del modelo
}

module.exports = model('Users', userSchema);