var socket = io.connect('localhost:8080', { 'forceNew': true });

socket.on('messages', function(data) {
    render(data);
});

socket.on('private-message', function(data) {
    data.esPrivado = true;
    render([data]);
});

function addMessage(e) {
    var message = {
        autor: document.getElementById("username").value,
        texto: document.getElementById("texto").value,
        destinatario: document.getElementById("destinatario").value
    };
    socket.emit("new-message", message);
    return false;
}

function render(data) {
    var html = data.map(function(elem) {
        if (elem.esPrivado) {
            return(`<div style="color: red;">
                        <strong>MENSAJE PRIVADO DE ${elem.autor}</strong>:
                        <em>${elem.texto}</em>
                    </div>`);
        } else {
            return(`<div>
                        <strong>${elem.autor}</strong>:
                        <em>${elem.texto}</em>
                    </div>`);
        }
    }).join(" ");
    var chat = document.getElementById('chat');
    chat.innerHTML += html;
    chat.scrollTop = chat.scrollHeight;
}

function registerUser() {
    var usuario = document.getElementById("username").value;
    if (usuario.trim() === '') {
        alert('Por favor, ingresa un nombre de usuario.');
        return;
    }

    socket.emit("new-user", usuario);

    document.getElementById('login').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
}
