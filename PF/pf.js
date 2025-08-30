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
    nuevaEncuesta();
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