
function validarTexto(input) {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
}

function validarEdad(input) {
  
    input.value = input.value.replace(/[^0-9]/g, '');
}




function agregarServicio() {
    let personaID = document.getElementById("PersonaID").value;
    let servicioID = document.getElementById("ServicioID").value;
    let profesionID = document.getElementById("ProfesionID").value;
    let descripcion = document.getElementById("descripcion").value || "Descripción pendiente";
    let titulo = document.getElementById("titulo").value || "Título temporal";
    let institucion = document.getElementById("institucion").value || "Institución sin especificar";

    let formData = new FormData();
    formData.append("ServicioID", servicioID);
    formData.append("PersonaID", personaID);
    formData.append("ProfesionID", profesionID);
    formData.append("Descripcion", descripcion);
    formData.append("Titulo", titulo);
    formData.append("Institucion", institucion);

    $.ajax({
        url: '/Servicios/AgregarServicio',
        data: formData,
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "Servicio guardado exitosamente",
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                }).then(() => {
                    $('#agregarServicio').modal('hide'); 
                    $('.modal-backdrop').remove(); 
                    LimpiarModal(); 
                    CardServicios(); 
                });
            } else {
                Swal.fire({
                    title: "Error al guardar el servicio",
                    text: response.message,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                });
            }
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el servicio');
            Swal.fire({
                title: "Oops...",
                text: "Disculpe, existió un problema al guardar el servicio",
                icon: "error",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });
        }

        
    });
}

function agregarServicio() {
    let personaID = document.getElementById("PersonaID").value;
    let servicioID = document.getElementById("ServicioID").value;
    let profesionID = document.getElementById("ProfesionID").value;
    let descripcion = document.getElementById("descripcion").value || "Descripción pendiente";
    let titulo = document.getElementById("titulo").value || "Título temporal";
    let institucion = document.getElementById("institucion").value || "Institución sin especificar";

    let formData = new FormData();
    formData.append("ServicioID", servicioID);
    formData.append("PersonaID", personaID);
    formData.append("ProfesionID", profesionID);
    formData.append("Descripcion", descripcion);
    formData.append("Titulo", titulo);
    formData.append("Institucion", institucion);

    $.ajax({
        url: '/Servicios/AgregarServicio',
        data: formData,
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "Servicio guardado exitosamente",
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                }).then(() => {
                    $('#agregarServicio').modal('hide'); 
                    $('.modal-backdrop').remove(); 
                    LimpiarModal(); 
                    CardServicios(); 
                });
            } else {
                Swal.fire({
                    title: "Error al guardar el servicio",
                    text: response.message,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                });
            }
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al guardar el servicio');
            Swal.fire({
                title: "Oops...",
                text: "Disculpe, existió un problema al guardar el servicio",
                icon: "error",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });
        }

        
    });
}



RecuperarPerfilPersonaLogeada();
function RecuperarPerfilPersonaLogeada() {
    $.ajax({
        url: '../../Persona/RecuperarPerfilPersonaLogeada',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (Personas) {
            console.log(Personas);  
            $("#perfilContainer").empty();
            let contenidoPerfil = `<div class="row">`; 

            $.each(Personas, function (index, perfil) {
                $('#LocalidadID').val(perfil.localidadID)
                contenidoPerfil += `
                    <div class="col-md-6  text-start color"> 
                        <p class ="pading_datos_personales color-texto"><strong><i class="fa-solid fa-location-dot"></i> Localidad:</strong> ${perfil.nombreLocalidad}</p>
                        <p class =" pading_datos_personales color-texto"><strong><i class="fa-regular fa-user"></i> Nombre:</strong> ${perfil.nombre}</p>
                        <p class =" pading_datos_personales color-texto"><strong><i class="fa-regular fa-user"></i> Apellido:</strong> ${perfil.apellido}</p>
                    </div>
                    <div class="col-md-6 text-start color">
                        <p class ="pading_datos_personales color-texto"><strong><i class="fa-solid fa-phone"></i> Teléfono:</strong> ${perfil.telefono}</p>
                        <p class =" pading_datos_personales color-texto"><strong><i class="fa-regular fa-calendar-days"></i> Edad:</strong> ${perfil.edad}</p>
                        <p class = "pading_datos_personales color-texto"><strong><i class="fa-solid fa-user"></i> Documento:</strong> ${perfil.documento}</p>
                    </div>
                    <div class="col-md-12 text-start color">
                      
                        <div class="button-group mt-3 posicion_boton">
                            <button type="button" class="btn btn-outline-light" onclick="EditarPefil(${perfil.personaID})">
                                Editar Cuenta
                            </button>
                        </div>
                    </div>

                    
                `;
            });

            contenidoPerfil += `</div>`; // Cerrar el contenedor de la fila
            $("#perfilContainer").html(contenidoPerfil);
        },
        error: function (xhr, status) {
            console.error('Error al recuperar el perfil:', status);
            alert('Disculpe, existió un problema al recuperar el perfil.');
        }
    });
}








function EditarPefil(personaID) {

    document.getElementById("PersonaID").value = personaID;

    $.ajax({
        url: '../../Persona/RecuperarPerfilPersonaLogeada',
        data: { id: personaID },
        type: 'POST',
        dataType: 'json',
        success: function (personas) {
            let Persona = personas[0];
            document.getElementById("PersonaID").value = Persona.personaID;
            document.getElementById("nombre").value = Persona.nombre;
            document.getElementById("apellido").value = Persona.apellido;
            document.getElementById("edad").value = Persona.edad;
            document.getElementById("documento").value = Persona.documento;
            document.getElementById("telefono").value = Persona.telefono;
            document.getElementById("LocalidadID").value = Persona.nombreLocalidad;

            $("#ModalVistaPersona").modal("show");
            RecuperarPerfilPersonaLogeada();

        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema ');
        }
    });
}

function GuardarPerfil() {
    var personaID = $('#PersonaID').val();
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var edad = $('#edad').val();
    var telefono = $('#telefono').val();
    var documento = $('#documento').val();
    var correo = "";
    var localidadId = $('#LocalidadID').val();

    $.ajax({
        url: '/Persona/GuardarPerfilLogeada',
        type: 'POST',
        data: {
            personaID: personaID,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            telefono: telefono,
            documento: documento,
            correo: correo,
            localidadId: localidadId
        },
        success: function (response) {

                  $("#ModalVistaPersona").modal("hide");
            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: '¡Éxito!',
                text: 'Los datos se guardaron correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Cerrar el modal
      

            // Llamar a la función para recuperar el perfil actualizado
            RecuperarPerfilPersonaLogeada();
        },
        error: function (error) {
            console.log(error);
            alert('Ocurrió un error al guardar los datos.');
        }
    });
}
function EliminarPersona(personaID) {

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                url: '../../Persona/EliminarPersona',
                data: { personaID: personaID },
                type: 'POST',
                dataType: 'json',
                success: function (respuesta) {
                    if (respuesta.success) {

                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El registro ha sido eliminado exitosamente.",
                            icon: "success"
                        }).then(() => {

                            window.location.href = '../Identity/Account/Login'; // Cambia la ruta según tu configuración
                        });
                    } else {

                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al eliminar el registro.",
                            icon: "error"
                        });
                    }
                },
                error: function (xhr, status) {

                    Swal.fire({
                        title: "Error",
                        text: "Disculpa, hubo un problema al intentar eliminar el registro.",
                        icon: "error"
                    });
                }
            });
        }
    });
}








//este el es el js que te muestra que servicio fue solicitado y las veces con los botones para responder
function ListadoServicioSolicitado(servicioID) {
    $.ajax({
        url: '../../ContratoRespondido/ListadoServicioSolicitado',
        type: 'POST',
        data: { servicioID: servicioID },
        dataType: 'json',
        success: function(traerServicios) {
            let contenidoModal = ``;

            if (traerServicios.success === false) {
                // Mostrar mensaje si el backend devuelve un mensaje de error
                contenidoModal = `
                <div class="text-center p-4">
                    <h5 class="texto-servicios-solicitados">${traerServicios.message}</h5>
                </div>`;
            } else if (traerServicios.length === 0) {
                // Mostrar mensaje si no hay datos
                contenidoModal = `
                <div class="text-center p-4">
                    <h5 class="texto-servicios-solicitados">No hay solicitudes disponibles para este servicio.</h5>
                </div>`;
            } else {
            
                $.each(traerServicios, function(index, traerservicio) {
                    contenidoModal += `
                    <div class="col-sm-12 col-md-3 col-lg-4 mb-3">
                        <div class="card-container-mis_l card-hoover tamanio-card" id="card-${traerservicio.contratoRespondidoID}">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Servicio Solicitado</h5>
                                    <div class="contenido-extra mt-3">
                                        <p><strong><i class="fa-solid fa-calendar"></i> Fecha del Match:</strong> ${traerservicio.stringFechaMatch}</p>
                                        <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del Trabajo:</strong> ${traerservicio.descripcionTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${traerservicio.comentarioTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-map-marker-alt"></i> Dirección:</strong> ${traerservicio.direccionTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-clock"></i> Hora Solicitada:</strong> ${traerservicio.horaSolicitadaTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-calendar-alt"></i> Fecha Solicitada:</strong> ${traerservicio.fechaSolicitadaTrabajo}</p>
                                        <p class="respuesta"><strong><i class="fa-solid fa-info-circle"></i> Respuesta:</strong> ${traerservicio.respuestaDesolicitudString}</p>
                                        <div class="d-flex align-items-center gap-2 mt-3">
                                            <button type="button" class="btn btn-outline-success" onclick=" AceptarRespuesta (${traerservicio.contratoRespondidoID})">
                                               <i class="fa-solid fa-check"></i></i> Aceptar
                                            </button>
                                            <button type="button" class="btn btn-outline-danger" onclick="Rechazar(${traerservicio.contratoRespondidoID})">
                                               <i class="fa-solid fa-ban"></i> Rechazar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
            }

            const serviciosSolicitados = document.getElementById("ServiciosSolicitados");
            serviciosSolicitados.innerHTML = contenidoModal;

      
            $('#modalServicioSolicitado').modal('show');
        },
        error: function(xhr, status) {
            alert('Hubo un problema al cargar las solicitudes.');
        }
    });
}







function AceptarRespuesta(contratoRespondidoID) {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres aceptar esta solicitud?  Atencion No podra cambiar despues",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirma, realizar la solicitud AJAX
            $.ajax({
                url: '../../ContratoRespondido/CambiarEstado',
                type: 'POST',
                dataType: 'json',
                data: {
                    contratoRespondidoID: contratoRespondidoID,
                    estado: 'aceptar'
                },
                success: function (respuesta) {
                    if (respuesta.success) {
                        
                        $(`#card-${contratoRespondidoID} .respuesta`).html(`<strong><i class="fa-solid fa-info-circle"></i> Respuesta:</strong> Aceptado`);

                        // Desactiva los botones para evitar múltiples interacciones
                        $(`#card-${contratoRespondidoID} .btn-outline-success`).prop('disabled', true).fadeOut(); 
                        $(`#card-${contratoRespondidoID} .btn-outline-danger`).prop('disabled', true).fadeOut(); 
                    } else {
                        Swal.fire('Error', respuesta.mensaje, 'error'); 
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire('Error', 'Hubo un error al aceptar la solicitud: ' + error, 'error');
                }
            });
        }
    });
}

function Rechazar(contratoRespondidoID) {
 
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres rechazar esta solicitud?  Atencion No podra cambiar despues",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Rechazar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
        
            $.ajax({
                url: '../../ContratoRespondido/CambiarEstado',
                type: 'POST',
                dataType: 'json',
                data: {
                    contratoRespondidoID: contratoRespondidoID,
                    estado: 'rechazar'
                },
                success: function (respuesta) {
                    if (respuesta.success) {
                        // Actualiza el campo respuesta en la tarjeta específica
                        $(`#card-${contratoRespondidoID} .respuesta`).html(`<strong><i class="fa-solid fa-info-circle"></i> Respuesta:</strong> Rechazado`);

                        // Desactiva los botones para evitar múltiples interacciones
                        $(`#card-${contratoRespondidoID} .btn-outline-success`).prop('disabled', true).fadeOut(); // También los oculta
                        $(`#card-${contratoRespondidoID} .btn-outline-danger`).prop('disabled', true).fadeOut(); // También los oculta
                    } else {
                        Swal.fire('Error', respuesta.mensaje, 'error'); // Muestra el mensaje de error del backend
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire('Error', 'Hubo un error al rechazar la solicitud: ' + error, 'error');
                }
            });
        }
    });
}





function LimpiarModal() {
    // document.getElementById("PersonaID").value = 0;
    // document.getElementById("ProfesionID").value = 0;
    // document.getElementById("herramientas").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";
    // document.getElementById("descripcion").value = "";

}
