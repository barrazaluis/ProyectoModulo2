alert("Bienvenido al sistema de encuestas");

class Pregunta {
  constructor(texto) {
    this.texto = texto;
    this.opciones = [];
  }

  agregarOpcion(texto) {
    this.opciones.push({ texto, votos: 0, votantes: [] });
  }

  votar(opcionIndex, nombreVotante) {
    const opcion = this.opciones[opcionIndex];
    if (opcion) {
      opcion.votos++;
      opcion.votantes.push(nombreVotante);
    }
  }
}

class Encuesta {
  constructor(nombre) {
    this.id = Date.now();
    this.nombre = nombre;
    this.preguntas = [];
  }

  agregarPregunta(pregunta) {
    this.preguntas.push(pregunta);
  }
}

class SistemaEncuestas {
  constructor() {
    this.encuestas = [];
    this.votaciones = [];
  }

