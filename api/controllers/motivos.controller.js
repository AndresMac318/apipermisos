const { response } = require('express');
const mysqlConnection = require('../connection/connection');

const listarMotivos = async (req, res = response) => {
    const sql = `SELECT * FROM motivo`;
    await mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
}

const obtenerMotivo = async (req, res = response) => {
    const { id } = req.params;
    //?console.log(id);
    let sql = 'SELECT * FROM `motivo` WHERE `codMotivo`= ?'
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            console.log(rows);
            res.json(rows);
        }
    });
}

const crearMotivo = async (req, res = response) => {
    const { codMotivo, detalleMotivo, descripcion } = req.body;
    //?console.log('entro');
    const sql = 'INSERT INTO `motivo` (`codMotivo`, `detalleMotivo`, `descripcion`) VALUES (?, ?, ?); ';
    await mysqlConnection.query(sql, [codMotivo, detalleMotivo, descripcion], (err, rows, fields) => {
        if (err) throw err
        else {
            if (err) throw err
            else {
                /* console.log('test consulta empleado'); */
                res.json({ status: 'OK: Motivo agregado' })
            }
        }
    });
}

const editarMotivo = async (req, res = response) => {
    const { codMotivo, detalleMotivo, descripcion } = req.body;
    const sql = 'UPDATE motivo SET codMotivo = ?, detalleMotivo = ?, descripcion = ? WHERE codMotivo = ?'
    await mysqlConnection.query(sql, [codMotivo, detalleMotivo, descripcion, codMotivo], (err, rows, fields) => {
        if (err) {
            throw err;
        } else {
            res.json({ status: 'OK: Motivo actualizado' });
        }
    });
}

const borrarMotivo = async (req, res = response) => {
    //?console.log('id:', req.params.id);
    const { id } = req.params
    let sql = `DELETE FROM motivo WHERE codMotivo = '${id}'`
    await mysqlConnection.query(sql, (err, rows, fields) => {
        if (err) throw err
        else {
            res.json({ status: 'eliminado' })
            //?console.log(res.json);
        }
    });
}

module.exports = {
    listarMotivos,
    obtenerMotivo,
    crearMotivo,
    editarMotivo,
    borrarMotivo
}