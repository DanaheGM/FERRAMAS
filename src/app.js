const express = require('express');
const path = require('path');
const session = require('express-session'); // Para manejar la sesión del administrador

const app = express();

app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios
app.use(session({
    secret: 'clave_secreta_12345', // Cambia esto por un valor seguro
    resave: false,
    saveUninitialized: true
}));

// Configuración de EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración para archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Usuario de administrador
const adminUser = {
    username: 'admin',
    password: '12345'
};

// Rutas para las páginas principales
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/productos', (req, res) => {
    res.render('productos');
});

app.get('/contacto', (req, res) => {
    res.render('contacto');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/carrito', (req, res) => {
    res.render('carrito');
});

// Rutas para las páginas de cada producto
app.get('/productos/taladro', (req, res) => {
    res.render('taladro');
});

app.get('/productos/martillo', (req, res) => {
    res.render('martillo');
});

app.get('/productos/destornillador', (req, res) => {
    res.render('destornillador');
});

app.get('/productos/sierra', (req, res) => {
    res.render('sierra');
});

app.get('/productos/alicate', (req, res) => {
    res.render('alicate');
});

app.get('/productos/llave-inglesa', (req, res) => {
    res.render('llave-inglesa');
});

// Ruta para procesar el inicio de sesión
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUser.username && password === adminUser.password) {
        req.session.isAdmin = true; // Indicador de sesión de administrador
        res.redirect('/admin'); // Redirige a la página de administración
    } else {
        req.session.isAdmin = false;
        res.redirect('/productos'); // Redirige a productos para usuarios normales
    }
});

// Ruta para la página de administración
app.get('/admin', (req, res) => {
    if (req.session.isAdmin) {
        res.render('admin'); // Renderiza la vista de administración si es administrador
    } else {
        res.redirect('/login'); // Redirige a login si no es administrador
    }
});

// Ruta para procesar la actualización de productos
app.post('/admin/update-products', (req, res) => {
    const updatedProducts = req.body; // Captura los datos enviados desde el formulario

    // Aquí podrías imprimir los datos en consola para verificar que están llegando correctamente
    console.log('Datos recibidos para actualizar productos:', updatedProducts);

    // Responder al cliente para que redirija nuevamente al panel de administración
    res.redirect('/admin');
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/productos');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
