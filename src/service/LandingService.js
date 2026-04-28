// src/service/LandingService.js
const SlotService = require('./SlotService');
const Flight = require('../models/FlightModel');

const LandingService = {
    async requestLanding(flightId) {
        const flight = await Flight.findByPk(flightId);
        if (flight.status !== 'WAITING') throw new Error("Apenas voos WAITING podem pedir slot.");

        // Lógica de Prioridade: Se EMERGENCY, a busca de slots deve retornar os primeiros disponíveis
        // A lógica de "fura fila" ocorre aqui:
        const availableSlots = await SlotService.getSortedAvailableSlots(flight.priority);
        
        if (availableSlots.length === 0) throw new Error("Sem slots disponíveis.");

        const selectedSlot = availableSlots[0];
        await SlotService.reserveSlot(selectedSlot.id, flightId);
        
        return { message: "Slot reservado com sucesso", slot: selectedSlot };
    }
};

module.exports = LandingService;