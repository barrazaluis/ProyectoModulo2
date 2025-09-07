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
