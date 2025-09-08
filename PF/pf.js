alert("Bienvenido al sistema de encuestas");

let encuestas = [];
let votaciones = [];

const crearPregunta = (texto, opcionesTexto) => ({
  texto,
  opciones: opcionesTexto.map(op => ({
    texto: op,
    votos: 0,
    votantes: []
  }))
});

const registrarVoto = (pregunta, opcionIndex, votante) => ({
  ...pregunta,
  opciones: pregunta.opciones.map((op, i) =>
    i === opcionIndex
      ? { ...op, votos: op.votos + 1, votantes: [...op.votantes, votante] }
      : op
  )
});

function inicio() {
  let salir = false;
  while (!salir) {
    let seleccion = Number(prompt("Sistema de encuestas\n" +
      "Seleccione la opción deseada:\n" +
      "1. Crear nueva encuesta\n" +
      "2. Votar en encuesta existente\n" +
      "3. Mostrar resultados de encuestas\n" +
      "4. Salir"));

    if (seleccion === 1) {
      generarEncuesta();
    } else if (seleccion === 2) {
      votarEnEncuesta();
    } else if (seleccion === 3) {
      mostrarResultado();
    } else if (seleccion === 4) {
      alert("Gracias por usar el sistema de encuestas");
      salir = true;
    } else {
      alert("Opción inválida. Intente nuevamente.");
    }
  }
}

function generarEncuesta() {
  const nombre = prompt("Ingrese el nombre de la encuesta:");
  if (!nombre || nombre.trim() === "") {
    alert("Nombre inválido. Cancelando creación.");
    return;
  }

  const nuevaEncuesta = {
    id: Date.now(),
    nombre: nombre.trim(),
    preguntas: []
  };

  for (let i = 0; i < 8; i++) {
    const textoPregunta = prompt(`Pregunta ${i + 1}:`);
    if (!textoPregunta || textoPregunta.trim() === "") {
      alert("Texto inválido. Cancelando encuesta.");
      return;
    }

    const opcionesTexto = [];
    for (let j = 0; j < 2; j++) {
      const opcion = prompt(`Opción ${j + 1} para la pregunta ${i + 1}:`);
      if (!opcion || opcion.trim() === "") {
        alert("Opción inválida. Cancelando encuesta.");
        return;
      }
      opcionesTexto.push(opcion.trim());
    }

    const pregunta = crearPregunta(textoPregunta.trim(), opcionesTexto);
    nuevaEncuesta.preguntas.push(pregunta);
  }

  encuestas.push(nuevaEncuesta);
  alert("Encuesta creada exitosamente.");
}

function votarEnEncuesta() {
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles.");
    return;
  }

  let nombreVotante = prompt("Ingrese su nombre:");
  if (!nombreVotante || nombreVotante.trim() === "") {
    alert("Nombre inválido. Cancelando votación.");
    return;
  }

  let lista = encuestas.map((e, i) => `${i + 1}. ${e.nombre}`).join("\n");
  const seleccion = Number(prompt(`Seleccione una encuesta:\n${lista}`)) - 1;

  if (seleccion < 0 || seleccion >= encuestas.length || isNaN(seleccion)) {
    alert("Encuesta no válida.");
    return;
  }

  const encuesta = encuestas[seleccion];
  const respuestas = [];

  encuesta.preguntas = encuesta.preguntas.map((pregunta, i) => {
    let opcionesTexto = pregunta.opciones.map((op, j) => `${j + 1}. ${op.texto}`).join("\n");
    const opcionIndex = Number(prompt(`Pregunta ${i + 1}:\n${pregunta.texto}\n${opcionesTexto}`)) - 1;

    if (opcionIndex < 0 || opcionIndex >= pregunta.opciones.length || isNaN(opcionIndex)) {
      alert("Opción no válida. Se omite esta pregunta.");
      return pregunta;
    }

    respuestas.push({
      pregunta: pregunta.texto,
      opcion: pregunta.opciones[opcionIndex].texto
    });

    return registrarVoto(pregunta, opcionIndex, nombreVotante.trim());
  });

  votaciones.push({
    nombre: nombreVotante.trim(),
    encuestaId: encuesta.id,
    respuestas
  });

  alert("Gracias por completar la encuesta.");
}

function mostrarResultado() {
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles.");
    return;
  }

  let resultadoTexto = "";
  encuestas.forEach((encuesta, i) => {
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

inicio();
