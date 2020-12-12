
let io = require('socket.io');
let debug = require('debug')('weblend-server:socket-connection');

function initializeSockets(httpServer) {
    io = io(httpServer);

    io.on('connection', (socket) => {
        debug("socket connection received");
    })


    debug("socket.io server initialized");
}

module.exports = initializeSockets;
