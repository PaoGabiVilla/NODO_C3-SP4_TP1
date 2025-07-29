// views/responseView.mjs
/* Sprint 1
export function renderizarSuperheroe(superheroe) {
    return JSON.stringify(superheroe, null, 2);
}

export function renderizarListaSuperheroes(superheroes) {
    return JSON.stringify(superheroes, null, 2);
}
*/

//Sprint2TP3

export function renderizarSuperheroe(superheroe) {
  return {
    Nombre: superheroe.nombreSuperHeroe,
    "Nombre Real": superheroe.nombreReal,
    Edad: superheroe.edad,
    "Planeta de Origen": superheroe.planetaOrigen,
    Debilidad: superheroe.debilidad,
    Poderes: superheroe.poderes,
    Aliados: superheroe.aliados,
    Enemigos: superheroe.enemigos,
    Creador: superheroe.creador
  };
}

export function renderizarListaSuperheroes(superheroes) {
  return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}