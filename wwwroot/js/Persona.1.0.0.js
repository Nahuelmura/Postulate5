$(document).ready(function() {
    $("#formulario").on("submit", function(event) {
        event.preventDefault();
        if (Guardar()) {
            enviarFormularioAjax();
        }
    });
});

function Guardar() {
    // Limpiar mensajes de error anteriores
    $(".error-message").remove();

    let isValid = true;

    if ($("#ProvinciaID").val() === "") {
        $("#ProvinciaID").after('<div class="error-message text-danger">El campo Provincia no puede estar vacío.</div>');
        $("#ProvinciaID").focus();
        isValid = false;
    }
    if ($("#LocalidadID").val() === "") {
        $("#LocalidadID").after('<div class="error-message text-danger">El campo Localidad no puede estar vacío.</div>');
        if (isValid) $("#LocalidadID").focus(); 
    }
    if ($("#nombre").val() === "") {
        $("#nombre").after('<div class="error-message text-danger">El campo Nombre no puede estar vacío.</div>');
        if (isValid) $("#nombre").focus();
        isValid = false;
    }
    if ($("#apellido").val() === "") {
        $("#apellido").after('<div class="error-message text-danger">El campo Apellidos no puede estar vacío.</div>');
        if (isValid) $("#apellido").focus();
        isValid = false;
    }
    if ($("#edad").val() === "") {
        $("#edad").after('<div class="error-message text-danger">El campo Edad no puede estar vacío.</div>');
        if (isValid) $("#edad").focus();
        isValid = false;
    }
    if ($("#telefono").val() === "") {
        $("#telefono").after('<div class="error-message text-danger">El campo Teléfono no puede estar vacío.</div>');
        $("#telefono").focus();
        isValid = false;
    }
    
    if ($("#documento").val() === "") {
        $("#documento").after('<div class="error-message text-danger">El campo Documento no puede estar vacío.</div>');
        if (isValid) $("#documento").focus();
        isValid = false;
    }

    return isValid;
}

function enviarFormularioAjax() {
    let formData = new FormData($("#formulario")[0]);


    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`); // Esto imprimirá todos los campos enviados.
    }
    $.ajax({
        url: '../../Persona/Guardar',
        data: formData,
        type: 'POST',
        processData: false, // Necesario para FormData
        contentType: false, // Necesario para FormData
        dataType: 'json',
        success: function(resultado) {
            console.log("Formulario guardado exitosamente");
            $("#formulario").fadeOut("slow", function() {
                $("#mensajeExito").html('<div class="alert Felicitaciones" role="alert">Felicidades, usted es un nuevo usuario de Postulate.Com</div>');
                $("#mensajeExito").fadeIn("slow", function() {
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                });
            });
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al guardar el formulario');
        }
    });
}






function validarTexto(input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
}

function validarEdad(input) {
  
    input.value = input.value.replace(/[^0-9]/g, '');
}