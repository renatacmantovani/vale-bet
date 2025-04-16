const express = require('express');
const router = express.Router();
const atleta = require('../controller/atleta.controller.js');
const auth = require('../middlewares/auth.middleware');
const { editar } = require('../controller/atleta.controller.js');
const { excluir } = require('../controller/atleta.controller.js');


router.post('/atletas', atleta.createAtleta);
router.get('/atletas', atleta.listar);
router.post('/atletas/:atletaId/apostar', auth, atleta.apostar);
router.put('/atletas/:id', editar);
router.delete('/atletas/:id', excluir);

module.exports = router;
