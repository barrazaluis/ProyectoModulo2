alert("bienvenido al sistema de encuestas")

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

let encuestas = [];
let resultados = [];

function generarEncuesta(encuestas) {
    
  const nombre = prompt("Ingrese el nombre de la encuesta:");
  if (!nombre || nombre.trim() === "") {
    console.log("Nombre inválido. Cancelando creación.");
    return;
  }
  
  const nuevaEncuesta = {
    id: Date.now(),
    nombre: nombre.trim(),
    preguntas: []
  };

  // Iterar para ingresar 8 preguntas
  for (let i = 0; i < 8; i++) {
    const textoPregunta = prompt(`Ingrese el texto de la pregunta ${i + 1}:`);
    if (!textoPregunta || textoPregunta.trim() === "") {
      console.log(`Pregunta ${i + 1} inválida. Cancelando encuesta.`);
      return;
    }

    const opciones = [];
    for (let j = 0; j < 3; j++) {
      const opcion = prompt(`Ingrese la opción ${j + 1} para la pregunta ${i + 1}:`);
      if (!opcion || opcion.trim() === "") {
        console.log(`Opción ${j + 1} inválida. Cancelando encuesta.`);
        return;
      }
      opciones.push(opcion.trim());
    }

    // Agregar pregunta con sus opciones
    nuevaEncuesta.preguntas.push({
      texto: textoPregunta.trim(),
      opciones: opciones
    });
  }

  // Agregar encuesta al array global
  encuestas.push(nuevaEncuesta);
  console.log("✅ Encuesta creada con éxito:", nuevaEncuesta);
}