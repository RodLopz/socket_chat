function registrarUsuario(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Hago la petición al servidor 
    var promise = $.ajax({
        type: 'POST',
        url: '/registroNueva',
        data: JSON.stringify({ username: username, password: password }),
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json'
    });

    
    // Trato la respuesta que me da el servidor
    promise.always(function (data) {
        console.log(data.res); //muestra la segunda opcion not valid para no saltar directo al window .error
        //alert(data);
        if (data.res == "register true") {
            window.location.replace("/login");
        } else if (data.res == "usuario ya existe") {
            alert("Usuario ya existe");
        } else if (data.res == "register failed") {
            alert("Debes introducir el usuario y contraseña");
        } else {
            window.alert("Error");
        }
    });
};


function iniciarSesion(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Hago la petición al servidor 
    var promise = $.ajax({
        type: 'POST',
        url: '/identificar', // '/identificar',
        data: JSON.stringify({ username: username, password: password }),
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json'
    });


    // Trato la respuesta que me da el servidor
    promise.always(function (data) {
        console.log(data.res); //muestra la segunda opcion not valid para no saltar directo al window .error
        //alert(data);
        if (data.res == "login true") {
            window.location.replace("/rutaSegura");
        } else if (data.res == "not valid") {
            alert("No estás autorizado, ese usuario no es válido");
        } else if (data.res == "login failed") {
            alert("Debes introducir el usuario y contraseña");
        } else {
            window.alert("Error");
        }
    });
};


function iniciarSesionLOGS(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Hago la petición al servidor 
    var promise = $.ajax({
        type: 'POST',
        url: '/identificar', // '/identificar',
        data: JSON.stringify({ username: username, password: password }),
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json'
    });


    // Trato la respuesta que me da el servidor
    promise.always(function (data) {
        console.log(data.res); //muestra la segunda opcion not valid para no saltar directo al window .error
        //alert(data);
        if (data.res == "login true") {
            window.location.replace("/listadoUsuario");
        } else if (data.res == "not valid") {
            alert("No estás autorizado, ese usuario no es válido");
        } else if (data.res == "login failed") {
            alert("Debes introducir el usuario y contraseña");
        } else {
            window.alert("Error");
        }
    });
};

function irARegistro() {
    window.location.href = '/registroNueva';
}









function obtenerUsuarios() {

    
    $.ajax({
        url: '/obtenerUsuarios', 
        method: 'GET',
        success: function(data) {
            console.log(data); 
            data.forEach(function(usuario) {
                console.log(usuario); 
                $('#tablaUsuarios tbody').append('<tr><td>' + usuario.nombre + '</td></tr>');
            });
        },
        error: function(err) {
            console.error('Error al obtener los usuarios:', err);
        }
    });
}

