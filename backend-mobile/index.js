const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js');
const atletaRoutes = require('./routes/atleta.routes');
const WebSocketServer = require('ws').WebSocketServer;
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

ws.on('connection', (socket) => {
    console.log('Cliente WebSocket conectado');

    socket.on('message', (message) => {
        console.log('Mensagem recebida:', message.toString());

        // Envia como JSON
        const payload = {
            text: `Echo: ${message.toString()}`,
            sentBy: "server",
            date: new Date()
        };

        //socket.send(JSON.stringify(payload));
    });

    socket.on('close', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb://localhost:27017/jwt';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro MongoDB:', err));

const loginRouter = require('./routes/authRoute.js');
const taskRouter = require('./routes/taskRoute.js');

app.use('/api', loginRouter);
app.use('/api', taskRouter);
app.use('/api', atletaRoutes);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
    console.log(`📡 WebSocket disponível em ws://localhost:${port}`);
});
