const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Runway = sequelize.define('Runway', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  isBusy: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Runway;