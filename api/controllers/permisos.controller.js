const { response } = require('express');
const mysqlConnection = require('../connection/connection');

const getIds = async (req, res = response) => {
    const { cedulaAdmin, cedulaEmpleado } = req.body;
    let sql = 'SELECT idAdministrativo FROM administrativo WHERE cedula = ?';
    await mysqlConnection.query(sql, [cedulaAdmin], async (err, rows, fields) => {
        if (err) throw err
        else {
            if (err) throw err
            else {
                const AdminRows = rows;
                sql = 'SELECT idEmpleado FROM empleado WHERE cedula = ?';
                await mysqlConnection.query(sql, [cedulaEmpleado], (err, rows, fields) => {
                    if (err) throw err
                    else {
                        if (err) throw err
                        else {
                            const EmpleadoRows = rows;
                            res.json({
                                idAdministrativo: AdminRows[0] ? AdminRows[0].idAdministrativo : null,
                                EmpleadoRows: EmpleadoRows[0] ? EmpleadoRows[0].idEmpleado : null
                            });
                        }
                    }
                });
            }
        }
    });
}

const crearPermiso = async (req, res = response) => {
    const { idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo, estado } = req.body;
    const sql = 'INSERT INTO permiso (idPermiso, idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo, estado) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)';
    await mysqlConnection.query(sql, [idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo, estado], (err, rows, fields) => {
        if (err) throw err
        else {
            if (err) throw err
            else {
                res.json({ status: 'OK: Permiso agregado' })
            }
        }
    });
}

const listarPermisos = async (req, res = response) => {
    const { id } = req.params;
    const sql = 'SELECT idPermiso, cedula, nombre1, apellido1, fpermiso, fsalida, fentrada, estado, detalleMotivo FROM permiso inner join empleado using(idEmpleado) INNER JOIN persona USING (cedula) INNER JOIN motivo USING(codMotivo) WHERE idAdministrativo = ?;'
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })
}

const borrarPermiso = async (req, res = response) => {
    const { id } = req.params;
    const sql = 'DELETE FROM permiso WHERE idPermiso = ?';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) {
            throw err;
        } else {
            res.json({
                status: true,
                msg: 'Permiso borrado'
            });
        }
    })
}

const listarSolicitudes = async (req, res = response) => {
    const { id } = req.body;
    const sql = 'SELECT idPermiso, cedula, nombre1, apellido1, fpermiso, fsalida, fentrada, estado, codMotivo, detalleMotivo, descripcion FROM permiso INNER JOIN empleado USING(idEmpleado) INNER JOIN persona USING(cedula) INNER JOIN motivo USING(codMotivo) WHERE idEmpleado = ?;';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })
}
/* const listarSolicitudes = async (req, res = response) => {
    const { id } = req.body;
    const sql = 'SELECT idPermiso, cedula, nombre1, apellido1, fpermiso, fsalida, fentrada, estado, detalleMotivo FROM permiso inner join empleado using(idEmpleado) INNER JOIN persona USING (cedula) INNER JOIN motivo USING(codMotivo) WHERE idEmpleado = ?;';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    })
} */

module.exports = {
    getIds,
    crearPermiso,
    listarPermisos,
    borrarPermiso,
    listarSolicitudes,
}