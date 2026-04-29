// src/service/SlotService.js
const RunwaySlot = require('../models/RunwaySlotModel');
const Flight = require('../models/FlightModel'); // Importante: Adicionado!
const { Op } = require('sequelize');

const SlotService = {
    // 1. Consulta: Listar todos (para o GET /slots)
    async getAll() {
        return await RunwaySlot.findAll();
    },

    // 2. Consulta: Apenas disponíveis (para o LandingService)
    async findAvailableSlot() {
        return await RunwaySlot.findAll({ where: { flightId: null } });
    },

    // 3. Criação: Adicionar novos slots na pista (para o POST /slots)
    async create(data) {
        return await RunwaySlot.create(data);
    },

    // 4. Reserva: Lógica de negócio
    async reserveSlot(slotId, flightId) {
        const slot = await RunwaySlot.findByPk(slotId);
        if (!slot) throw new Error("Slot não encontrado.");
        if (slot.flightId) throw new Error("Slot já reservado.");

        // Atualiza ambos (Slot e o Flight vinculado)
        await slot.update({ flightId });
        await Flight.update({ slotId: slot.id }, { where: { id: flightId } });
        
        return slot;
    }
};

module.exports = SlotService;