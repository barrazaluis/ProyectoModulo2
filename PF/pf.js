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
