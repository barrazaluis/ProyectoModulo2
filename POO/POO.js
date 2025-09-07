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



  votarEnEncuesta() {
    if (this.encuestas.length === 0) {
      alert("No hay encuestas disponibles.");
      return;
    }

    const nombreVotante = prompt("Ingrese su nombre:");
    if (!nombreVotante || nombreVotante.trim() === "") {
      alert("Nombre inválido. Cancelando votación.");
      return;
    }

    const lista = this.encuestas.map((e, i) => `${i + 1}. ${e.nombre}`).join("\n");
    const seleccion = Number(prompt(`Seleccione una encuesta:\n${lista}`)) - 1;

    const encuesta = this.encuestas[seleccion];
    if (!encuesta) {
      alert("Encuesta no válida.");
      return;
    }

    const respuestas = [];

    for (let i = 0; i < encuesta.preguntas.length; i++) {
      const pregunta = encuesta.preguntas[i];
      const opcionesTexto = pregunta.opciones.map((op, j) => `${j + 1}. ${op.texto}`).join("\n");
      const opcionIndex = Number(prompt(`Pregunta ${i + 1}:\n${pregunta.texto}\n${opcionesTexto}`)) - 1;

      if (opcionIndex < 0 || opcionIndex >= pregunta.opciones.length || isNaN(opcionIndex)) {
        alert("Opción no válida. Se omite esta pregunta.");
        continue;
      }

      pregunta.votar(opcionIndex, nombreVotante.trim());

      respuestas.push({
        pregunta: pregunta.texto,
        opcion: pregunta.opciones[opcionIndex].texto
      });
    }

    this.votaciones.push({
      nombre: nombreVotante.trim(),
      encuestaId: encuesta.id,
      respuestas
    });

    alert("Gracias por completar la encuesta.");
  }

  mostrarResultados() {
    if (this.encuestas.length === 0) {
      alert("No hay encuestas disponibles.");
      return;
    }

    let resultadoTexto = "";
    this.encuestas.forEach((encuesta, i) => {
      resultadoTexto += `Encuesta ${i + 1}: ${encuesta.nombre}\n`;
      encuesta.preguntas.forEach((pregunta, j) => {
        resultadoTexto += `  Pregunta ${j + 1}: ${pregunta.texto}\n`;
        pregunta.opciones.forEach((opcion, k) => {
          resultadoTexto += `    Opción ${k + 1}: ${opcion.texto} - Votos: ${opcion.votos}\n`;
          if (opcion.votantes.length > 0) {
            resultadoTexto += `      Votantes: ${opcion.votantes.join(", ")}\n`;
          }
        });
      });
      resultadoTexto += "\n";
    });

    alert(resultadoTexto);
  }
}