const { response } = require('express');
const mysqlConnection = require('../connection/connection');
const bcrypt = require('bcryptjs');

function makebase64(buff) {
    let bufferOriginal = Buffer.from(buff.data).toString("base64");
    let buff2 = Buffer.from(bufferOriginal, 'base64');
    let text = buff2.toString('ascii');
    return text;
}

const listarEmpleados = async (req, res = response) => {
    const sql = `SELECT * FROM persona NATURAL JOIN empleado`;
    await mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
}

const obtenerEmpleado = async (req, res = response) => {
    const { id } = req.params;
    //?console.log(id);
    let sql = 'SELECT * FROM `persona` WHERE `cedula`= ?';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            //console.log(rows);
            const empleado = rows[0];
            empleado.firma = makebase64(empleado.firma.toJSON())
            res.json({ status: true, empleado });
        }
    });
}

const crearEmpleado = async (req, res = response) => {
    const {
        idHuella, cedula, apellido1, apellido2, nombre1, nombre2, email,
        password, telefono, direccion, sexo, fnacimiento, firma, rol
    } = req.body;

    /* Hash password */
    /* const salt = bcrypt.genSaltSync();
    passHash = bcrypt.hashSync(password, salt); */

    //console.log('entro');
    const sql = 'INSERT INTO `persona` (`id_huella`, `cedula`, `apellido1`, `apellido2`, `nombre1`, `nombre2`, `email`, `password`, `telefono`, `direccion`, `sexo`, `fnacimiento`, `firma`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

    try {
        await mysqlConnection.query(sql, [idHuella, cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol], async (err, rows, fields) => {
            try {
                if (err) throw err
                else {
                    //?console.log('test consulta empleado');
                    const sql1 = 'INSERT INTO `empleado` (`idEmpleado`, `cedula`) VALUES (NULL, ?)';
                    await mysqlConnection.query(sql1, [cedula], (err, rows, fields) => {
                        if (err) throw err
                        else {
                            return res.json({ status: true, msg: 'empleado agregado' })
                        }
                    })
                }
            } catch (error) {
                let msg = "ocurrio un error consulte con el administrador";
                //?console.log(msg)
                return res.json({
                    status: false,
                    msg: msg
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const editarEmpleado = async (req, res = response) => {
    const {
        cedula, apellido1, apellido2, nombre1, nombre2, email, password,
        telefono, direccion, sexo, fnacimiento, firma, rol
    } = req.body;
    const sql = 'UPDATE persona SET cedula = ?, apellido1 = ?, apellido2 = ?, nombre1 = ?, nombre2 = ?, email = ?, password = ?, telefono = ?, direccion = ?, sexo = ?, fnacimiento = ?, firma = ?, rol = ? WHERE cedula = ?';
    await mysqlConnection.query(sql, [cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol, cedula], (err, rows, fields) => {
        if (err) {
            //?console.log('error here');
            throw err;
        } else {
            res.json({ status: 'OK: Usuario actualizado' });
        }
    });
}

const borrarEmpleado = async (req, res = response) => {
    //?console.log('id:', req.params.id);
    const { id } = req.params
    let sql = `DELETE FROM empleado WHERE cedula = ${id};`;
    await mysqlConnection.query(sql, async (err, rows, fields) => {
        if (err) throw err
        else {
            const sql2 = `DELETE FROM persona WHERE cedula = ${id}`;
            await mysqlConnection.query(sql2, (err, rows, fields) => {
                if (err) throw err
                else {
                    res.json({ status: 'OK: Empleado eliminado' })
                }
            });
        }
    });
}


module.exports = {
    listarEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    editarEmpleado,
    borrarEmpleado
}