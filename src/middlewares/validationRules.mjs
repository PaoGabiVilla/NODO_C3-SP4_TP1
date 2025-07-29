import { body } from 'express-validator';

export const registerValidationRules = () => [
 /*nombreSuperheroe debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud minima de 
3 caracteres y una longitud maxima de 60*/
    body('nombreSuperHeroe').notEmpty().withMessage('El nombre del superheroe es necesario')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres').trim(),

/*nombreReal debe validarse que sea requerido, no tenga espacios en blanco(trim), una longitud 
minima de 3 caracteres y una longitud maxima de 60*/
    body('nombreReal').notEmpty().withMessage('El nombre Real es requerido')
    .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres').trim(),

/*edad debe validarse que sea requerido, que sea un número, no tenga espacios en blanco(trim), 
valor minimo 0 (no admite edad negativa)*/
    body('edad').notEmpty().withMessage('Edad es requerida')
    .isInt({ min: 0 }).withMessage('Edad incorrecta')
    .trim(),

/*poderes debe validarse que sea requerido, que sea un array de string cuyo tamaño no sea 0, 
cada elemento no tenga espacios en blanco, cada elemento una longitud minima de 3 caracteres 
y una longitud maxima de 60*/

body("poderes")
    .notEmpty()
    .withMessage("Poder es requerido, no puede estar vacío")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",") // separa los poderes por comas
          .map((p) => p.trim()) // recorre el array y elimina los espacios en blanco al principio y al final de la cadena
          .filter(Boolean); // elimina cadenas vacías automáticamente
      }
      return value;
    })

    .isArray({ min: 1 })
    .withMessage("Debe ingresar un array de al menos un poder"),
  body("poderes.*") // - validar cada elemento individual del array poderes
    .notEmpty()
    .withMessage("Debe indicar al menos un poder, no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El poder debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage("El poder debe tener como máximo 60 caracteres")
    .isString() //Filtra entradas no textuales
    .withMessage(
      "El poder debe ser un string (NO: numeros: decimal, entero, fechas,booleanos, arrays, objetos)"
    )
    .trim(),
 //ALIADOS
body("aliados")
    .notEmpty()
    .withMessage("Aliados es requerido, no puede estar vacío")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",") // separa los poderes por comas
          .map((p) => p.trim()) // recorre el array y elimina los espacios en blanco al principio y al final de la cadena
          .filter(Boolean); // elimina cadenas vacías automáticamente
      }
      return value;
    })

    .isArray({ min: 1 })
    .withMessage("Debe ingresar un array de al menos un poder"),
  body("aliados.*") // - validar cada elemento individual del array poderes
    .notEmpty()
    .withMessage("Debe indicar al menos un poder, no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("El poder debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage("El poder debe tener como máximo 60 caracteres")
    .isString() //Filtra entradas no textuales
    .withMessage(
      "El poder debe ser un string (NO: numeros: decimal, entero, fechas,booleanos, arrays, objetos)"
    )
    .trim(),

   //ENEMIGOS
    body("enemigos")
    .notEmpty()
    .withMessage("Enemigos es requerido, no puede estar vacío")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",") // separa los poderes por comas
          .map((p) => p.trim()) // recorre el array y elimina los espacios en blanco al principio y al final de la cadena
          .filter(Boolean); // elimina cadenas vacías automáticamente
      }
      return value;
    })

    .isArray({ min: 1 })
    .withMessage("Debe ingresar un array de al menos un poder"),
  body("enemigos.*") // - validar cada elemento individual del array poderes
    .notEmpty()
    .withMessage("Debe indicar al menos un poder, no puede estar vacío")
    .isLength({ min: 3 })
    .withMessage("el enemigo debe tener como mínimo 3 caracteres")
    .isLength({ max: 60 })
    .withMessage("El poder debe tener como máximo 60 caracteres")
    .isString() //Filtra entradas no textuales
    .withMessage(
      "El poder debe ser un string (NO: numeros: decimal, entero, fechas,booleanos, arrays, objetos)"
    )
    .trim(),

];