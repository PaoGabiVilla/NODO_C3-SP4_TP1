import express from 'express';
import {
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    obtenerSuperheroesMenoresDe30Controller,
    crearNuevoSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController,
    agregarNuevoSuperheroeController
} from '../controllers/superheroesController.mjs';

import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { renderizarFormularioEdicionController } from '../controllers/superheroesController.mjs';
//superHeroRoutes.mjs

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/menores-30', obtenerSuperheroesMenoresDe30Controller);
router.get('/heroes/:id/edit', renderizarFormularioEdicionController);
router.get('/heroes/agregar',agregarNuevoSuperheroeController);

router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController)

//Sprint3TP1
router.post('/heroes/crear', registerValidationRules(),handleValidationErrors, crearNuevoSuperheroeController);
router.post('/heroes/agregar', registerValidationRules(),handleValidationErrors, crearNuevoSuperheroeController);
router.post('/heroes/agregar', registerValidationRules(), handleValidationErrors, agregarNuevoSuperheroeController);

//router.put('/heroes/actualizar/:id', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
router.put('/heroes/:id', registerValidationRules(), handleValidationErrors, actualizarSuperheroeController);

router.put('/heroes/:id/editar', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController)
router.delete('/heroes/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);


router.get('/heroes/:id', obtenerSuperHeroePorIdController);
export default router;