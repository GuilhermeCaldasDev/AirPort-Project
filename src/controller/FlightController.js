const express = require('express');
const router = express.Router();
const FlightService = require('../service/FlightService');

// GET /flights
router.get('/RetornaVoos', async (req, res) => {
    try {
        const flights = await FlightService.RetornaVoos();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /flights
router.post('/CriarVoos', async (req, res) => {
    try {
        const newFlight = await FlightService.CriaVoos(req.body);
        res.status(201).json(newFlight);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PATCH /flights/:id/status
router.post('/AtualizaVoo/:id/status', async (req, res) => {
    try {
        const updatedFlight = await FlightService.AtualizaVoo(req.params.id, req.body.status);
        res.json({ message: "Status atualizado!", flight: updatedFlight });
    } catch (err) {
        res.status(err.message === "Voo não encontrado" ? 404 : 500).json({ error: err.message });
    }
});

module.exports = router;