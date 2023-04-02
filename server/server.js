const http = require('http')

const app = require('./src/config/app');
const { log } = require('console');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    })
}

startServer();