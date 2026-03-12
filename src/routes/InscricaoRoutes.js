const express = require("express");
const router = express.Router();

const InscricaoController = require("../controllers/InscricaoController");

// Rotas padrão
router.post("/", InscricaoController.store);
router.get("/", InscricaoController.index);
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);
router.patch("/:id/cancelar", InscricaoController.cancelar);

// --- ROTA DO DESAFIO EXTRA ---
// Esta linha deve ser adicionada para que o GET /inscricoes/1/detalhes funcione
router.get("/:id/detalhes", InscricaoController.detalhes);

module.exports = router;