const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = require('./src/config/app');

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Succesful connection to DB');
});

mongoose.connection.on('error', (error) => {
    console.error(`Failed connection to DB: ${error}`);
})

async function startServer() {
await mongoose.connect(process.env.DATABASE_URL)

    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    })
}

startServer();