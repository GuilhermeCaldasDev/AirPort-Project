const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Airport = require('./Airport');

const Flight = sequelize.define('Flight', {
  flightNumber: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'ON_TIME' }, // 'DELAYED', 'CANCELLED'
  departureTime: { type: DataTypes.DATE },
  arrivalTime: { type: DataTypes.DATE }
});

// Relacionamentos: Um voo tem uma origem e um destino
Flight.belongsTo(Airport, { as: 'origin', foreignKey: 'originId' });
Flight.belongsTo(Airport, { as: 'destination', foreignKey: 'destinationId' });

module.exports = Flight;