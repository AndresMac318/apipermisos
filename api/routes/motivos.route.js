const { Router } = require('express');

//controladores
const { listarMotivos, obtenerMotivo, crearMotivo, editarMotivo, borrarMotivo } = require('../controllers/motivos.controller');

const router = Router();

//Rutas
router.get('/', listarMotivos);

router.get('/:id', obtenerMotivo);

router.post('/', crearMotivo);

router.put('/:id', editarMotivo);

router.delete('/:id', borrarMotivo);

module.exports = router;