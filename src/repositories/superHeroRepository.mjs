// repository/superheroesRepository.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SuperheroesDataSource from './superheroesDataSource.mjs';

//Sprint2-TP3
import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// Clase para manejar archivo .txt (versión vieja)
/*export class SuperheroesFileRepository extends SuperheroesDataSource {
    constructor() {
        super();
        this.filePath = path.join(__dirname, '../superheroes.txt');
    }

    obtenerTodos() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data); // Convierte el archivo JSON en un array de objetos JS
    }
}*/

// Clase para usar con base de datos (versión nueva Sprint2-TP3)
class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({
            [atributo]: { $regex: valor, $options: 'i' } // búsqueda insensible a mayúsculas
        });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 }//,
           // planetaOrigen: 'Tierra',
           // poder: { $exists: true, $not: { $size: 1 } } // poder con al menos 2 elementos
        });
    }

    async obtenerMenoresDe30() {
        return await SuperHero.find({
            edad: { $lt: 30 },
            planetaOrigen: 'Tierra',
           poder: { $exists: true, $not: { $size: 1 } } // poder con al menos 2 elementos
        });
    }


//Sprint 3 tp1
    async crearSuperheroe(datosSuperheroe){
     
        const nuevoHeroe = new SuperHero(datosSuperheroe);

        return await nuevoHeroe.save()// guarda y retorna en una sola linea
        /*await nuevoHeroe.save();
        console.log(nuevoHeroe);
        return nuevoHeroe;*/
        }

        async actualizarHeroe(id, datosActualizar) {
        /* updateOne() o updateMany() devuelven el resultado de la operación pero no el documento actualizado
        y findByIdAndUpdate() devuelve el documento actualizado */
            const heroeActualizado = await SuperHero.findByIdAndUpdate(id, datosActualizar, { new: true });
            console.log(heroeActualizado);
            return heroeActualizado;
            
        }
        async eliminarPorId(id){
            console.log('Capa Repository - función eliminar por Id');
            const heroeEliminado = await SuperHero.findByIdAndDelete(id);
            console.log(heroeEliminado);
            return heroeEliminado;
        }
        
        async eliminarPorNombre(nombre){
            console.log('Capa Repository - función eliminar por Nombre');
            const heroeEliminado = await SuperHero.findOneAndDelete({nombreSuperHeroe: nombre});
            console.log(heroeEliminado);
            return heroeEliminado;
        }
    }
export default new SuperHeroRepository();
