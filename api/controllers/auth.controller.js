const { response } = require('express');
const mysqlConnection = require('../connection/connection');

const login = async (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM persona WHERE email = ? AND password = ?;`;
    mysqlConnection.query(sql, [email, password], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                const user = rows[0];
                if (user.rol == "admin") {
                    sql = `SELECT * FROM persona inner join administrativo using(cedula) WHERE cedula = ?;`;
                    mysqlConnection.query(sql, [user.cedula], (err, rows, fields) => {
                        if (err) throw err
                        else {
                            if (err) throw err
                            else {
                                const user = rows[0];
                                res.json(user)
                            }
                        }
                    })
                } else {
                    sql = `SELECT * FROM persona inner join empleado using(cedula) WHERE cedula = ?;`;
                    mysqlConnection.query(sql, [user.cedula], (err, rows, fields) => {
                        if (err) throw err
                        else {
                            if (err) throw err
                            else {
                                const user = rows[0];
                                res.json(user)
                            }
                        }
                    })
                }
            } else {
                res.send('Usuario o clave incorrectos');
            }
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    login
}