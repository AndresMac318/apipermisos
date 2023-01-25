const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

  //host: 'http://ls-2c7c10122ce807738c3a83d761dbe4ce45dbc5a5.calrgacor2x0.us-east-1.rds.amazonaws.com',
  host: 'ls-2c7c10122ce807738c3a83d761dbe4ce45dbc5a5.calrgacor2x0.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  port: '3306',
  database: 'dbpass'
  /* host: 'localhost',
  user: 'root',
  password: 'pass2022',
  port: '3306',
  database: 'dbpermisos' */
});

mysqlConnection.connect(err => {
  if (err) {
    console.log('Error en la conexion a la database: ', err);
    return;
  } else {
    console.log('OK : Conexion establecida correctamente!');
  }
});

module.exports = mysqlConnection;