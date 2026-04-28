// src/service/SlotService.js
const RunwaySlot = require('../models/RunwaySlotModel');
const { Op } = require('sequelize');

const SlotService = {
    async findAvailableSlot() {
        return await RunwaySlot.findAll({ where: { flightId: null } });
    },

    async reserveSlot(slotId, flightId) {
        const slot = await RunwaySlot.findByPk(slotId);
        if (slot.flightId) throw new Error("Slot já reservado.");

        await slot.update({ flightId });
        await Flight.update({ slotId: slot.id }, { where: { id: flightId } });
    }
};

module.exports = SlotService;