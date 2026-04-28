const express = require('express');
const router = express.Router();
const FlightService = require('../service/FlightService');

// GET /flights - Lista todos os voos ativos
router.get('/', async (req, res) => {
    try {
        const flights = await FlightService.fetchAllFlights();
        res.json(flights);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// POST /flights - Cria/Agenda novo voo
router.post('/', async (req, res) => {
    try {
        const flight = await FlightService.scheduleNewFlight(req.body);
        res.status(201).json(flight);
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
});

// PATCH /flights/:id/status - Atualiza o status de um voo específico
router.patch('/:id/status', async (req, res) => {
    try {
        const updated = await FlightService.updateFlightStatus(req.params.id, req.body.status);
        res.json({ message: "Status atualizado", flight: updated });
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    }
});

module.exports = router;