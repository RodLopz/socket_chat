var socket = io('http://localhost:8080');


socket.on('messages', function(data) {
    render(data);
});

socket.on('private-message', function(data) {
    data.esPrivado = true;
    render([data]);
});

function addMessage(e) {
    var message = {
        autor: $("#username").val(),
        texto: $("#texto").val(),
        destinatario: $("#destinatario").val()
    };
    socket.emit("new-message", message);
    return false;
}

function render(data) {
    var html = data.map(function(elem) {
        return elem.esPrivado ?
            `<div style="color: red;"><strong>MENSAJE PRIVADO DE ${elem.autor}</strong>:<em>${elem.texto}</em></div>` :
            `<div><strong>${elem.autor}</strong>:<em>${elem.texto}</em></div>`;
    }).join(" ");
    $('#chat').append(html).scrollTop($('#chat')[0].scrollHeight);
}

function registerUser() {
    var usuario = $("#username").val();
    if (usuario.trim() === '') {
        alert('Por favor, ingresa un nombre de usuario.');
        return;
    }

    socket.emit("new-user", usuario);

    $('#login').hide();
    $('#chat-container').show();
}
