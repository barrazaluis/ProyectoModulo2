alert("Bienvenido al sistema de encuestas");

let encuestas = []; 
let resultados = [];

function inicio() {
    let salir = false;

    while (!salir) {
        let seleccion = Number(prompt(
            "Sistema de tickets\n" +
            "Seleccione la opción deseada:\n" +
            "1. Crear nueva encuesta\n" +
            "2. Votar en encuesta existente\n" +
            "3. Mostrar resultados de encuestas\n" +
            "4. Salir"
        ));

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

inicio();

function generarEncuesta(encuestas) {
    // Solicitar nombre de la encuesta
    const nombre = prompt("Ingrese el nombre de la encuesta:");
    if (!nombre || nombre.trim() === "") {
        console.log("Nombre inválido. Cancelando creación.");
        return;
    }

    // Inicializar objeto de encuesta
    const nuevaEncuesta = {
        id: Date.now(),
        nombre: nombre.trim(),
        preguntas: []
    };

    // Iterar para registrar 8 preguntas
    for (let i = 0; i < 2 i++) {
        const textoPregunta = prompt(`Ingrese el texto de la pregunta ${i + 1}:`);
        if (!textoPregunta || textoPregunta.trim() === "") {
            console.log(`Pregunta ${i + 1} inválida. Cancelando encuesta.`);
            return;
        }

        const opciones = [];

        // Iterar para registrar 3 opciones por pregunta
        for (let j = 0; j < 2; j++) {
            const opcion = prompt(`Ingrese la opción ${j + 1} para la pregunta ${i + 1}:`);
            if (!opcion || opcion.trim() === "") {
                console.log(`Opción ${j + 1} inválida. Cancelando encuesta.`);
                return;
            }
            opciones.push(opcion.trim());
        }

        // Agregar pregunta con sus opciones al arreglo
        nuevaEncuesta.preguntas.push({
            texto: textoPregunta.trim(),
            opciones: opciones
        });
    }

    // Registrar encuesta en el arreglo principal
    encuestas.push(nuevaEncuesta);
    console.log("Encuesta creada exitosamente:", nuevaEncuesta);
}

function votarEnEncuesta() {
  if (encuestas.length === 0) {
    alert("No hay encuestas disponibles.");
    return;
  }

  // Mostrar lista de encuestas
  let lista = encuestas.map((e, i) => `${i + 1}. ${e.nombre}`).join("\n");
  const seleccion = Number(prompt(`Seleccione una encuesta:\n${lista}`)) - 1;

  if (seleccion < 0 || seleccion >= encuestas.length || isNaN(seleccion)) {
    alert("Encuesta no válida.");
    return;
  }

  const encuesta = encuestas[seleccion];
  alert(`Has seleccionado la encuesta: ${encuesta.nombre}`);

  // Iterar por todas las preguntas
  for (let i = 0; i < encuesta.preguntas.length; i++) {
    const pregunta = encuesta.preguntas[i];
    let opcionesTexto = pregunta.opciones.map((op, j) => `${j + 1}. ${op.texto}`).join("\n");
    const opcionIndex = Number(prompt(`Pregunta ${i + 1}:\n${pregunta.texto}\n${opcionesTexto}`)) - 1;

    if (opcionIndex < 0 || opcionIndex >= pregunta.opciones.length || isNaN(opcionIndex)) {
      alert("Opción no válida. Se omite esta pregunta.");
      continue;
    }

    pregunta.opciones[opcionIndex].votos++;
    alert("Voto registrado.");
  }

  alert("Gracias por completar la encuesta.");
}
