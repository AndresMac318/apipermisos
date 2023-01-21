const { Router } = require('express');

//controladores
const { getIds, listarPermisos, crearPermiso, listarSolicitudes, borrarPermiso } = require('../controllers/permisos.controller');

const router = Router();

//Rutas
router.post('/', crearPermiso);

router.get('/:id', listarPermisos);

router.post('/solicitudes', listarSolicitudes);

router.post('/Ids', getIds);

router.delete('/:id', borrarPermiso);


module.exports = router;