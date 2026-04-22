const express = require('express');
const sequelize = require('./config/database');
const Runway = require('./models/Runway');

const app = express();
app.use(express.json());

// Sincroniza o banco e sobe o app
sequelize.sync().then(() => {
    console.log('✅ Banco sincronizado!');
    app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
});

// Endpoint de teste
app.get('/runways', async (req, res) => {
    const data = await Runway.findAll();
    res.json(data);
});