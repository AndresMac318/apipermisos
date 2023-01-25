const { Router } = require('express');

//controladores
const {
    listarEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    editarEmpleado,
    borrarEmpleado
} = require('../controllers/empleados.controller');

const router = Router();

//Rutas
router.get('/', listarEmpleados);

router.get('/:id', obtenerEmpleado);

router.post('/', crearEmpleado);

router.put('/:id', editarEmpleado);

router.delete('/:id', borrarEmpleado);

module.exports = router;