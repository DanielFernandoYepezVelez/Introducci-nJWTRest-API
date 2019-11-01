require('./database');

const app = require('./app');

app.set('port', process.env.PORT || 5000);

/* Utilizo esta función para utilizar async-await y no tener que utilizar callBacks o promesas */
/* Declaro en memoria la función init() */
async function init(){
  await app.listen(app.get('port'));
  console.log(`Server On Port ${app.get('port')}`);
}

/* Ejecuto la función init() */
init();