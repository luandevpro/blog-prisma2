const express = require('express');
app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', routes);

app.listen(8080, () => {
  console.log('sucesss');
});
