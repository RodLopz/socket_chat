var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static('public'));

var userSockets = {};

app.get('/', (req, res) => {
    var contenido = fs.readFileSync("public/index.html");
    res.setHeader("Content-type", "text/html");
    res.send(contenido);
});

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');

    socket.on('new-user', function(usuario) {
        userSockets[usuario] = socket;
        
        // Crear y enviar un mensaje de bienvenida personalizado
        let welcomeMessage = { id: Date.now(), texto: `Hola ${usuario}, soy el mensaje de inicio`, autor: "ADMINISTRADOR" };
        socket.emit('messages', [welcomeMessage]);
    });

    socket.on('new-message', function(data) {
        if (data.destinatario && userSockets[data.destinatario]) {
            userSockets[data.destinatario].emit('private-message', data);
            if (data.autor !== data.destinatario) {
                userSockets[data.autor].emit('private-message', data);
            }
        } else {
            io.emit('messages', [data]);
        }
    });
});
