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

inicio() {
    let salir = false;
    while (!salir) {
      let seleccion = Number(prompt("Sistema de encuestas\n" +
        "Seleccione la opción deseada:\n" +
        "1. Crear nueva encuesta\n" +
        "2. Votar en encuesta existente\n" +
        "3. Mostrar resultados de encuestas\n" +
        "4. Salir"));

      if (seleccion === 1) {
        this.crearEncuesta();
      } else if (seleccion === 2) {
        this.votarEnEncuesta();
      } else if (seleccion === 3) {
        this.mostrarResultados();
      } else if (seleccion === 4) {
        alert("Gracias por usar el sistema de encuestas");
        salir = true;
      } else {
        alert("Opción inválida. Intente nuevamente.");
      }
    }
  }

  crearEncuesta() {
    const nombre = prompt("Ingrese el nombre de la encuesta:");
    if (!nombre || nombre.trim() === "") {
      alert("Nombre inválido. Cancelando creación.");
      return;
    }

    const encuesta = new Encuesta(nombre.trim());

    for (let i = 0; i < 2; i++) {
      const textoPregunta = prompt(`Pregunta ${i + 1}:`);
      if (!textoPregunta || textoPregunta.trim() === "") {
        alert("Texto inválido. Cancelando encuesta.");
        return;
      }

      const pregunta = new Pregunta(textoPregunta.trim());

      for (let j = 0; j < 2; j++) {
        const textoOpcion = prompt(`Opción ${j + 1} para la pregunta ${i + 1}:`);
        if (!textoOpcion || textoOpcion.trim() === "") {
          alert("Opción inválida. Cancelando encuesta.");
          return;
        }
        pregunta.agregarOpcion(textoOpcion.trim());
      }

      encuesta.agregarPregunta(pregunta);
    }

    this.encuestas.push(encuesta);
    alert("Encuesta creada exitosamente.");
  }

  