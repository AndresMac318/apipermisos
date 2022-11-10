const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(cors());

const userRoute = require('./api/routes/user');
const empleadosRoute = require('./api/routes/empleados.route');
const motivosRoute = require('./api/routes/motivos.route');
const permisosRoute = require('./api/routes/permisos.route');

app.use('/user', userRoute);
app.use('/empleados', empleadosRoute);
app.use('/motivos', motivosRoute);
app.use('/permisos', permisosRoute);

module.exports = app;