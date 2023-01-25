const express = require('express');
const mysqlConnection = require('../connection/connection');

function makebase64(buff) {
  let bufferOriginal = Buffer.from(buff.data).toString("base64");
  let buff2 = Buffer.from(bufferOriginal, 'base64');
  let text = buff2.toString('ascii');
  return text;
}

exports.getUser = function (req, res) {
  const { id, rol } = req.body;
  let sql;
  if (rol == "admin") {
    sql = "SELECT * FROM persona inner join administrativo using(cedula) WHERE idAdministrativo = ?";
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
      if (err) throw err
      else {
        if (err) throw err
        else {

          const user = rows[0];
          user.firma = makebase64(user.firma.toJSON())
          return res.json(user)
        }
      }
    })
  } else {
    sql = "SELECT * FROM permiso inner join administrativo using(idAdministrativo) INNER JOIN persona USING (cedula) INNER JOIN motivo USING(codMotivo) WHERE idAdministrativo = ?;";
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
      if (err) throw err
      else {
        if (err) throw err
        else {
          const user = rows[0];
          user.firma = makebase64(user.firma.toJSON())
          return res.json(user)
        }
      }
    })
  }
}

/* Administradores */

/* exports.listarAdmins = function (req, res) {
  const sql = `SELECT * FROM persona NATURAL JOIN administrativo`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else {
      res.json(rows);
    }
  });
} */

/* exports.crearAdmin = function (req, res) {
  const {
    cedula,
    apellido1,
    apellido2,
    nombre1,
    nombre2,
    email,
    password,
    telefono,
    direccion,
    sexo,
    fnacimiento,
    firma,
    rol
  } = req.body;
  console.log('entro');
  const sql = 'INSERT INTO `persona` (`cedula`, `apellido1`, `apellido2`, `nombre1`, `nombre2`, `email`, `password`, `telefono`, `direccion`, `sexo`, `fnacimiento`, `firma`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

  mysqlConnection.query(sql, [cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol], (err, rows, fields) => {
    if (err) throw err
    else {
      const sql1 = 'INSERT INTO `administrativo` (`idAdministrativo`, `cedula`) VALUES (NULL, ?)';
      mysqlConnection.query(sql1, [cedula], (err, rows, fields) => {
        if (err) throw err
        else {
          res.json({ status: 'OK: Admin agregado' })
        }
      })
    }
  })
} */

/* exports.deleteAdmin = function (req, res) {
  console.log('id:', req.params.id);
  const { id } = req.params;
  let sql = `DELETE FROM administrativo WHERE cedula = ${id};`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err
    else {
      const sql2 = `DELETE FROM persona WHERE cedula = ${id}`;
      mysqlConnection.query(sql2, (err, rows, fields) => {
        if (err) throw err
        else {
          res.json({ status: 'OK: Administrador eliminado' })
        }
      })
    }
  })
} */

