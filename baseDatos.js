const mongoose = require('mongoose');
const mongoDBURL = 'mongodb+srv://rla0006:Rodrigo1998.@cluster0.28jhme5.mongodb.net/';

// definiendo el esquema del usuario
const usuarioSchema  = new mongoose.Schema({
  nombre: String,
  password: String
});

//creamos el modelo
const usuario= mongoose.model('usuario', usuarioSchema);

//conexion a bd 
const conexionBD = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('Conectado a MongoDB!');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1); // Salir del proceso con un código de error (1)
  }
};

module.exports ={ usuario , conexionBD } ;


