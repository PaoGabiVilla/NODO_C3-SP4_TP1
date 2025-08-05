import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

import methodOverride from 'method-override';
import session from 'express-session';
// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;


// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Archivo base de layout

// MIDDLEWARES
app.use(express.static(path.resolve('./public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);


//Configuración EJS como motor de vistas en Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal' });
});

// Ruta para la Lista de superhéroes
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Lista de superhéroes' });
});

// Ruta para la página agregar
app.get('/addSuperhero', (req, res) => {
  res.render('addSuperhero', { title: 'Crear' });
});

// Ruta para la página Acerca de
app.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de Nosotros' });
});

// Ruta para la página de Contacto
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contáctanos' });
});


// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

