const Flight = require('../models/FlightModels');
const { Op } = require('sequelize');

const FlightService = {
    
    // Regra: Lógica de negócio para busca (ex: filtragem inteligente)
    async RetornaVoos() {
        // Exemplo de regra: Filtra apenas voos que não foram cancelados
        // e garante ordenação por horário de partida
        return await Flight.findAll({
            where: { status: { [Op.ne]: 'CANCELLED' } },
            order: [['departureTime', 'ASC']]
        });
    },

    // Regra: Validações antes da persistência
    async CriaVoos(data) {
        const { flightNumber, departureTime } = data;

        // Não permite criar voos com horário de partida no passado
        if (new Date(departureTime) < new Date()) {
            throw new Error("Negado: Não é possível agendar voos no passado.");
        }
        // Formata o número do voo para maiúsculas
        const formattedData = {
            ...data,
            flightNumber: flightNumber.toUpperCase()
        };

        return await Flight.create(formattedData);
    },

    // Regra: Máquina de estados (impede transições inválidas)
    async AtualizaVoo(id, newStatus) {
        const flight = await Flight.findByPk(id);
        
        if (!flight) throw new Error("Voo não encontrado");

        // Regra 3: Máquina de estados (ex: voo cancelado é imutável)
        if (flight.status === 'CANCELLED') {
            throw new Error("Negado: Voos cancelados são imutáveis.");
        }

        // Regra 4: Validar se o status enviado é permitido
        const validStatuses = ['ON_TIME', 'DELAYED', 'CANCELLED'];
        if (!validStatuses.includes(newStatus)) {
            throw new Error("Negado: Status inválido.");
        }

        flight.status = newStatus;
        return await flight.save();
    }
};

module.exports = FlightService;