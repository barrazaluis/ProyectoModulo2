alert("bienvenido al sistema de encuestas")

let encuestas = [];
let resultados = [];

function inicio(){
let salir = false;
while(!salir){
    let seleccion = Number(prompt("sistema de tickets\n" +
      "Seleccione la opción deseada:\n" +
      "1. crear nueva encuesta\n" +
      "2. votar en encuesta existente\n" +
      "3. mostrar resultados de encuentas\n" +
      "4. Salir"))

if(seleccion === 1){
    generarEncuesta();
}else if(seleccion === 2){
    votarEnEncuesta();
}
else if(seleccion === 3){
    mostrarResultado();
}
else if (seleccion === 4) {
    alert("Gracias por usar el sistema de encuestas");
    salir = true;
}
}
}
inicio()


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

  for (let i = 0; i < 2; i++) {
    const textoPregunta = prompt(`Pregunta ${i + 1}:`);
    if (!textoPregunta || textoPregunta.trim() === "") {
      alert("Texto inválido. Cancelando encuesta.");
      return;
    }

    const opciones = [];
    for (let j = 0; j < 2; j++) {
      const opcion = prompt(`Opción ${j + 1} para la pregunta ${i + 1}:`);
      if (!opcion || opcion.trim() === "") {
        alert("Opción inválida. Cancelando encuesta.");
        return;
      }
      opciones.push({ texto: opcion.trim(), votos: 0 });
    }

    nuevaEncuesta.preguntas.push({
      texto: textoPregunta.trim(),
      opciones
    });
  }

  encuestas.push(nuevaEncuesta);
  alert("Encuesta creada exitosamente.");
}

function votarEnEncuesta() {
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles.");
    return;
  }

  let lista = encuestas.map((e, i) => `${i + 1}. ${e.nombre}`).join("\n");
  const seleccion = Number(prompt(`Seleccione una encuesta:\n${lista}`)) - 1;

  const encuesta = encuestas[seleccion];
  if (!encuesta) {
    alert("Encuesta no válida.");
    return;
  }

  let preguntasTexto = encuesta.preguntas.map((p, i) => `${i + 1}. ${p.texto}`).join("\n");
  const preguntaIndex = Number(prompt(`Seleccione una pregunta:\n${preguntasTexto}`)) - 1;

  const pregunta = encuesta.preguntas[preguntaIndex];
  if (!pregunta) {
    alert("Pregunta no válida.");
    return;
  }

  let opcionesTexto = pregunta.opciones.map((op, i) => `${i + 1}. ${op.texto}`).join("\n");
  const opcionIndex = Number(prompt(`Seleccione una opción:\n${opcionesTexto}`)) - 1;

  if (pregunta.opciones[opcionIndex]) {
    pregunta.opciones[opcionIndex].votos++;
    alert("Voto registrado.");
  } else {
    alert("Opción no válida.");
  }
}