const { Router } = require('express');

//controladores
const { getIds, listarPermisos, crearPermiso } = require('../controllers/permisos.controller');

const router = Router();

//Rutas
router.post('/', crearPermiso);

router.get('/:id', listarPermisos);

router.post('/Ids', getIds);


module.exports = router;