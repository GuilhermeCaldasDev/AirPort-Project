// src/models/Flight.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Flight = sequelize.define('Flight', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  flightNumber: { type: DataTypes.STRING, allowNull: false },
  origin: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.STRING, 
    defaultValue: 'ON_TIME', // Possíveis: 'ON_TIME', 'DELAYED', 'CANCELLED'
  },
  departureTime: { type: DataTypes.DATE, allowNull: false }
});

module.exports = Flight;