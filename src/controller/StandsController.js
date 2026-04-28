const express = require('express');
const router = express.Router();
const StandService = require('../service/StandService');

// GET /stands?status=FREE - Lista stands (usa query param para filtro)
router.get('/', async (req, res) => {
    try {
        // Se houver ?status=FREE, filtra pelo serviço, se não, retorna todos
        const stands = await StandService.findFreeStand(req.query.type); 
        res.json(stands);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /stands/:id/reserve - Reserva um stand específico
router.post('/:id/reserve', async (req, res) => {
    try {
        await StandService.reserve(req.params.id, req.body.flightId);
        res.status(200).json({ message: "Stand reservado com sucesso" });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// POST /stands/:id/reallocate - Realoca um voo
router.post('/:id/reallocate', async (req, res) => {
    try {
        await StandService.reallocate(req.params.id, req.body.newStandId, req.body.flightId);
        res.status(200).json({ message: "Stand realocado" });
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;