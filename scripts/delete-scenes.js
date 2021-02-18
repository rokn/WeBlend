var http = require('http');

const options = {
    host: 'localhost',
    port: 3000,
    path: '/apiV1/scenes'
};

http.request(options, (response) => {
    let str = '';

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        const scenes = JSON.parse(str);
        scenes.forEach(scene => {
            const options = {
                host: 'localhost',
                port: 3000,
                path: '/apiV1/scenes/' + scene._id,
                method: 'DELETE'
            };

            http.request(options).end();
        });
        console.log(`Deleted ${scenes.length} scenes.`)
    });

    response.on('error', console.error)
}).end();

