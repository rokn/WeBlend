
let io = require('socket.io');
let debug = require('debug')('weblend-server:socket-connection');

function initializeSockets(httpServer) {
    io = io(httpServer, {
        cors: {
            origin: '*',
        }
    });

    const scene_sockets = {};

    io.on('connection', (socket) => {
        debug('a user connected');
        let scene_id = null;

        socket.on('open scene', ({to_scene_id}) => {
            scene_id = to_scene_id;
            if (!scene_sockets[scene_id]) {
                scene_sockets[scene_id] = []
            }
            scene_sockets[scene_id].push(socket);
            debug("added to scene")
        });

        socket.on('command', (command) => {
            socket.broadcast.emit('command', command);
        })

        socket.on('disconnect', () => {
            if (scene_id) {
                const idx = scene_sockets[scene_id].indexOf(socket);
                if (idx >= 0) {
                    scene_sockets[scene_id].splice(idx);
                    debug("removed from scene")
                }
            }
        });
    })


    debug("socket.io server initialized");
}

module.exports = initializeSockets;
