const { response } = require('express');
const mysqlConnection = require('../connection/connection');
const bcrypt = require('bcryptjs');

function makebase64(buff) {
    let bufferOriginal = Buffer.from(buff.data).toString("base64");
    let buff2 = Buffer.from(bufferOriginal, 'base64');
    let text = buff2.toString('ascii');
    return text;
}

const listarAdmins = async (req, res = response) => {
    const sql = `SELECT * FROM persona NATURAL JOIN administrativo`;
    await mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
}

const crearAdmin = async (req, res = response) => {
    const {
        idHuella, cedula, apellido1, apellido2, nombre1, nombre2, email,
        password, telefono, direccion, sexo, fnacimiento, firma, rol
    } = req.body;

    //console.log('entro');
    const sql = 'INSERT INTO `persona` (`id_huella`, `cedula`, `apellido1`, `apellido2`, `nombre1`, `nombre2`, `email`, `password`, `telefono`, `direccion`, `sexo`, `fnacimiento`, `firma`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

    try {
        mysqlConnection.query(sql, [idHuella, cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol], (err, rows, fields) => {
            if (err) throw err
            else {
                const sql1 = 'INSERT INTO `administrativo` (`idAdministrativo`, `cedula`) VALUES (NULL, ?)';
                mysqlConnection.query(sql1, [cedula], (err, rows, fields) => {
                    if (err) throw err
                    else {
                        res.json({ status: true, msg: 'admin agregado' })
                    }
                })
            }
        })
    } catch (error) {
        let msg = "ocurrio un error consulte con el administrador";
        //?console.log(msg)
        return res.json({
            status: false,
            msg: msg
        });
    }

}

const obtenerAdmin = async (req, res = response) => {
    const { id } = req.params;
    //?console.log(id);
    let sql = 'SELECT * FROM `persona` WHERE `cedula`= ?';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            //console.log(rows);
            //res.json(rows);

            const admin = rows[0];
            admin.firma = makebase64(admin.firma.toJSON())
            res.json(admin);
        }
    });
}

const obtenerAdminId = async (req, res = response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM persona INNER JOIN administrativo USING(cedula) WHERE idAdministrativo = ?';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err
        else {
            const admin = rows[0];
            admin.firma = makebase64(admin.firma.toJSON())
            res.json({
                status: true,
                admin
            });
        }
    })
}

const editarAdmin = async (req, res = response) => {
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

const deleteAdmin = (req, res = response) => {
    //console.log('id:', req.params.id);
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
}


module.exports = {
    listarAdmins,
    crearAdmin,
    obtenerAdmin,
    editarAdmin,
    deleteAdmin,
    obtenerAdminId
}