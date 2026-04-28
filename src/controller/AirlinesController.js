const express = require('express');
const router = express.Router();
const AirlineService = require('../service/AirlineService');

// GET /airlines - Busca todas as empresas de aviacao
router.get('/', async (req, res) => {
    try {
        const airline = await AirlineService.getAll();
        res.status(201).json(airline);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// POST /airlines - Cria nova empresa de aviacao
router.post('/', async (req, res) => {
    try {
        const airline = await AirlineService.create(req.body);
        res.status(201).json(airline);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE /airlines/:id - Remove empresa
router.delete('/:id', async (req, res) => {
    try {
        await AirlineService.delete(req.params.id);
        res.status(204).send();
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;