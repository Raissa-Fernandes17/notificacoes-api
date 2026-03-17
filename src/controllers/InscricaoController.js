const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");

// POST /inscricoes — criar uma inscrição
function store(req, res) {
    const { eventoId, participanteId } = req.body;

    if (!eventoId || !participanteId) {
        return res
            .status(400)
            .json({ erro: "eventoId e participanteId são obrigatórios" });
    }

    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId)
    );

    if (resultado.erro) {
        return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);
}

// GET /inscricoes — listar todas
function index(req, res) {
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
}

// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);
    res.json(inscricoes);
}

// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);
    const resultado = InscricaoModel.cancelar(id);

    if (!resultado) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    res.json(resultado);
}

// --- DESAFIO EXTRA ---
// GET /inscricoes/:id/detalhes
function detalhes(req, res) {
    const id = parseInt(req.params.id);

    // Busca a inscrição
    const inscricao = InscricaoModel.listarTodas().find(i => i.id === id);

    if (!inscricao) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    // Busca dados do evento e participante
    const evento = EventoModel.buscarPorId(inscricao.eventoId);
    const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

    // Monta resposta detalhada
    const respostaDetalhada = {
        id: inscricao.id,
        status: inscricao.status,
        dataInscricao: inscricao.dataInscricao,
        evento: {
            id: evento.id,
            nome: evento.nome
        },
        participante: {
            id: participante.id,
            nome: participante.nome,
            email: participante.email
        }
    };

    res.json(respostaDetalhada);
}

module.exports = {
    index,
    store,
    listarPorEvento,
    cancelar,
    detalhes
};