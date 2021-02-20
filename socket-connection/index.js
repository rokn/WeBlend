
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

        socket.on('open scene', ({to_scene_id, username}) => {
            scene_id = to_scene_id;
            if (!scene_sockets[scene_id]) {
                scene_sockets[scene_id] = []
            }

            for (const sock of scene_sockets[scene_id]) {
                sock.emit('open scene', {username: username});
                socket.emit('open scene', {username: sock.username});
            }

            socket.username = username;
            scene_sockets[scene_id].push(socket);
        });

        socket.on('command', (command) => {
            if (!scene_id) return;
            for (const sock of scene_sockets[scene_id]) {
                if (sock === socket) continue;
                sock.emit('command', command);
            }
        })

        socket.on('disconnect', () => {
            if (scene_id) {
                const idx = scene_sockets[scene_id].indexOf(socket);
                if (idx >= 0) {
                    scene_sockets[scene_id].splice(idx, 1);

                    for (const sock of scene_sockets[scene_id]) {
                        debug(`Notifying ${sock.username} that ${socket.username} left`)
                        sock.emit('close scene', {username: socket.username});
                    }
                    debug("removed from scene")
                }
            }
        });
    })


    debug("socket.io server initialized");
}

module.exports = initializeSockets;
