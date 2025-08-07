// controllers/superheroesController.mjs

import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes,//sprint2TP3
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    obtenerSuperheroesMenoresDe30,
    crearNuevoSuperheroe, 
    actualizarSuperheroe, 
    eliminarSuperheroePorId, 
    eliminarSuperheroePorNombre
} from '../services/superheroesService.mjs';

import { 
    renderizarSuperheroe, 
    renderizarListaSuperheroes 
} from '../views/responseView.mjs';

//sprint1
// export function obtenerSuperheroePorIdController(req, res) {
//     const { id } = req.params;
//     const superheroe = obtenerSuperheroePorId(parseInt(id));
    
//     if (superheroe) {
//         res.send(renderizarSuperheroe(superheroe));
//     } else {
//         res.status(404).send({ mensaje: "Superhéroe no encontrado" });
//     }
// }



export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes con ese atributo'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
      error: error.message });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes mayores de 30 años'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30',
      error: error.message });
  }
}


export async function obtenerSuperheroesMenoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMenoresDe30();
    if (superheroes.length === 0) {
      return res.status(404).send({
        mensaje: 'No se encontraron superhéroes menores de 30 años'
      });
    }

    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).send(superheroesFormateados);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener superhéroes menores de 30',
      error: error.message });
  }
}
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        console.log('Capa controller - función eliminar por Nombre');
        const { nombre } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
        res.status(200).json(superheroeFormateado);

    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

//*************************************************************************************************************** */

export async function obtenerSuperHeroePorIdController(req, res) {
  try {
    console.log('Estoy en la capa controlador en la función obtenerSuperHeroePorIdController y me llegó req', req)
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).send(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener al superhéroe',
      error: error.message });
  }
}

//CREAR

export async function crearNuevoSuperheroeController(req, res) {
    try {
        const datos = req.body;
        const superheroeCreado = await crearNuevoSuperheroe(datos);

        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
        }

        const superheroesActualizados = await obtenerTodosLosSuperheroes();
        res.render('dashboard', {
            superheroes: superheroesActualizados, successMessage: '¡Superhéroe creado exitosamente!'
        });
    } catch (error) {
        res.render('dashboard', {
           errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
        });
    }
}


export async function actualizarSuperheroeController(req, res) {
    try {
        console.log('Entró a actualizarSuperheroeController con id:', req.params.id);
        const { id } = req.params;
        const datosActualizar = req.body;

        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizar);
        
        if (!superheroeActualizado) {
            return res.status(404).send({ mensaje: 'Superhéroe a actualizar no encontrado.' });
        }
        req.session.successMessage = 'Superheroes editado exitosamente';
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}


export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperheroePorId(id);

        if (!superheroeEliminado) {
            return res.status(404).send({ mensaje: 'Superhéroe a eliminar no encontrado.' });
        }
        req.session.successMessage = 'Superheroes eliminado exitosamente';
        res.redirect('/api/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
    }
}

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  try {
    const heroes = await obtenerTodosLosSuperheroes(); 

    const successMessage = req.session.successMessage || null;
    const errorMessage = req.session.errorMessage || null;

    req.session.successMessage = null; // Se limpia para que no vuelva a aparecer
    req.session.errorMessage = null;

    res.render('dashboard', { 
      title: 'Dashboard',

      superheroes: heroes,
      successMessage,
      errorMessage
    }); 
  } catch (error) {
    console.error('Error al obtener superhéroes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export async function renderizarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (!superheroe) {
      return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
    }

    res.render('editSuperhero', {
      title: 'Editar superhéroe',
      superheroe
    });
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al cargar el formulario de edición',
      error: error.message,
    });
  }
}

export async function agregarNuevoSuperheroeController(req, res) {
    try {
        const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
        const superheroeCreado = await crearNuevoSuperheroe(datos);

        if (!superheroeCreado) {
            return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
        }
          // Guardamos el mensaje de éxito en la sesión
         req.session.successMessage = '¡Superhéroe creado exitosamente!';
         res.redirect('/api/heroes'); 
    } 
    catch (error) {
        res.render('addSuperhero', {
          title: 'Agregar Superhéroe',
          errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
        });
    }
  }