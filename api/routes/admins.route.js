const { Router } = require('express');

//controladores
const {
    listarAdmins, crearAdmin, obtenerAdmin, obtenerAdminId, deleteAdmin, editarAdmin
} = require('../controllers/admins.controller');

const router = Router();

//Rutas
router.get('/', listarAdmins);

router.post('/', crearAdmin);

router.get('/:id', obtenerAdmin);

router.get('/by/:id', obtenerAdminId);

router.put('/:id', editarAdmin);

router.delete('/:id', deleteAdmin);


module.exports = router;