const { Router } = require('express');

//controladores
const { getIds, listarPermisos, crearPermiso, listarSolicitudes, borrarPermiso, obtenerPermiso, editarPermiso, obtenerPermisoE } = require('../controllers/permisos.controller');

const router = Router();

//Rutas
router.post('/', crearPermiso);

router.get('/:id', listarPermisos);

router.get('/employee/:id', obtenerPermiso);

router.get('/employee2/:id', obtenerPermisoE);

router.put('/:id', editarPermiso);

router.post('/solicitudes', listarSolicitudes);

router.post('/Ids', getIds);

router.delete('/:id', borrarPermiso);


module.exports = router;