const express = require('express');
const path = require('path');

const app = express();
const port = 3030;

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'home.html')));
app.get('/carrito', (req, res) => res.sendFile(path.join(__dirname, 'views', 'carrito.html')));
app.get('/detalle', (req, res) => res.sendFile(path.join(__dirname, 'views', 'detalle.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, 'views', 'registro.html')));
app.get('/compras', (req, res) => res.sendFile(path.join(__dirname, 'views', 'compras.html')));
app.listen(port, () => console.log('Server runnig in http://localhost:' + port));