
let io = require('socket.io');
let debug = require('debug')('weblend-server:socket-connection');

function initializeSockets(httpServer) {
    io = io(httpServer, {
        cors: {
            origin: '*', // TODO: Check if there's a better way for this
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        debug("socket connection received");
    })


    debug("socket.io server initialized");
}

module.exports = initializeSockets;
