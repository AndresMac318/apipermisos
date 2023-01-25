const { response } = require('express');
const mysqlConnection = require('../connection/connection');

function makebase64(buff) {
    let bufferOriginal = Buffer.from(buff.data).toString("base64");
    let buff2 = Buffer.from(bufferOriginal, 'base64');
    let text = buff2.toString('ascii');
    return text;
}

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
                res.json({ status: true, msg: 'Permiso agregado' });
            }
        }
    });
}

const editarPermiso = async (req, res = response) => {
    const { id } = req.params;
    //console.log(req.body);
    const { idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo, estado } = req.body;
    const sql = 'UPDATE permiso SET fpermiso = ?, fsalida = ?, fentrada = ?, observaciones = ?, codMotivo = ?, estado = ? WHERE idPermiso = ?';
    await mysqlConnection.query(sql, [fpermiso, fsalida, fentrada, observaciones, codMotivo, estado, id], (err, rows, fields) => {
        if (err) {
            throw err;
            //?console.log('error here');
            /* return res.json({
                status: false,
                msg: 'Error al actualizar permiso'
            }) */
        } else {
            return res.json({
                status: true,
                msg: 'Permiso Actualizado!'
            });
        }
    })
}

// Obtener permisos para Admin
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

const obtenerPermiso = async (req, res = response) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM permiso WHERE idPermiso = ?';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            const solicitudRow = rows;
            res.json({ solicitudE: solicitudRow[0] });
        }
    })
}

const obtenerPermisoE = async (req, res = response) => {
    const { id } = req.params;
    const sql = 'SELECT idPermiso, id_huella, idEmpleado, idAdministrativo, cedula, email, direccion, telefono, nombre1, nombre2, apellido1, apellido2, firma, fpermiso, fsalida, fentrada, estado, detalleMotivo, descripcion, codMotivo FROM permiso INNER JOIN empleado USING(idEmpleado) NATURAL JOIN persona INNER JOIN motivo USING(codMotivo) WHERE idPermiso = ?;';
    await mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            const permiso = rows[0];
            permiso.firma = makebase64(permiso.firma.toJSON())
            res.json({
                status: true,
                permiso
            })
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

// Obtener permisos para empleado
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
    obtenerPermiso,
    obtenerPermisoE,
    editarPermiso,
    borrarPermiso,
    listarSolicitudes,
}