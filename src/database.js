const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/simplejwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(db => console.log('Database is Connected'))
  .catch(error => console.error(error));