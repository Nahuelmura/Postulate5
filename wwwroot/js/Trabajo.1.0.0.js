function CardTrabajos() {
    $.ajax({
        url: '/Trabajo/CardTrabajos',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (tiposProfesionMostrar) {
            console.log(tiposProfesionMostrar);
            LimpiarModal();
            let contenidoCard = ``;
            contenidoCard += `<div class="row">`;

            let trabajosEncontrados = false;

            $.each(tiposProfesionMostrar, function (index, tipoProfesion) {

                if (tipoProfesion.listadoPersonas && tipoProfesion.listadoPersonas.length > 0) {
                    trabajosEncontrados = true;
                    $.each(tipoProfesion.listadoPersonas, function (index, persona) {
                        contenidoCard += `
                            <div class="col-md-4 mb-3 cartas_card" id="card-${persona.trabajoID}"> <!-- col-md-4 para tener 3 por fila en pantallas medianas o más grandes -->
                                <div class="card  card-container-mis_trabajo card h-100"> <!-- Establecemos una altura mínima y uso de flex -->
                                    <div class="row g-0 h-100 padin">
                                    
                                        <h5 class="card-title text-center">${tipoProfesion.nombre}</h5> <!-- Título de la profesión dentro de la tarjeta -->
                                    
                                        <p><strong><i class="fa-solid fa-location-dot"></i> Dirección:</strong> ${persona.direccion}</p>
                                        <p><strong><i class="fa-solid fa-list"></i> Descripción:</strong> ${persona.descripcion}</p>
                                        <p><strong><i class="fa-regular fa-clock"></i> Hora:</strong> ${persona.horastring}</p>
                                        <p><strong><i class="fa-regular fa-calendar"></i> Fecha de inicio:</strong> ${persona.fechastring}</p>
                                        <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${persona.comentario}</p>

                                        
                                        
                                       
                                     <div class="card-action mt-auto">
<div class="row">
    <!-- Columna Izquierda -->

    
    <div class="col-12 col-md-6 d-flex flex-column gap-2 mt-3">
      <button type="button" class="btn btn-outline-secondary" onclick="abrirModalPostular(${persona.trabajoID})">
            <i class="fa-regular fa-paper-plane"></i> Postularme
        </button>
        <button type="button" class="btn btn-outline-success me-1" onclick="EditarTrabajo(${persona.trabajoID})">
            <i class="fa-regular fa-pen-to-square"></i> Editar
        </button>
        <button type="button" class="btn btn-outline-danger" onclick="EliminarTrabajo(${persona.trabajoID})">
            <i class="fa-regular fa-trash-can"></i> Eliminar
        </button>
      
    </div>

    <!-- Columna Derecha -->
    <div class="col-12 col-md-6 d-flex flex-column gap-2 mt-3">
        <button type="button" class="btn btn-outline-secondary" onclick="ListadoTrabajosPostulados(${persona.trabajoID})">
         <i class="fa-solid fa-hourglass-start"></i> Respuestas
        </button>
        <button type="button" class="btn btn-outline-secondary" onclick="Buscartrabajorechazado(${persona.trabajoID})">
          <i class="fa-solid fa-ban"></i> Rechazadas
        </button>
        <button type="button" class="btn btn-outline-secondary" onclick="BuscartrabajoAceptado(${persona.trabajoID})">
           <i class="fa-solid fa-check"></i> Aceptadas
        </button>
    </div>
</div>
</div>
                                    </div>
                                </div>
                            </div>`;
                    });
                }
            });

            contenidoCard += `</div>`;


            if (!trabajosEncontrados) {
                contenidoCard = `
                    <div class="alert alert-warning text-center" role="alert">
                        No hay trabajos suyos postulados ni asociados a sus servicios.
                    </div>`;
            }

            document.getElementById("contenedorCards").innerHTML = contenidoCard;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al cargar los trabajos');
        }
    });
}



function LimpiarModal() {
    document.getElementById("TrabajoID").value = 0;
    document.getElementById("direccion").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("comentario").value = "";
    document.getElementById("descripcion").value = "";
    

    document.getElementById("ProfesionID").selectedIndex = 0; 
}



document.addEventListener("DOMContentLoaded", CardTrabajos);







function agregarTrabajo() {
    let personaID = document.getElementById("PersonaID").value;
    let trabajoID = document.getElementById("TrabajoID").value;
    let profesionID = document.getElementById("ProfesionID").value;
    let descripcion = document.getElementById("descripcion").value || "Descripción pendiente";
    let direccion = document.getElementById("direccion").value || "Direccion no especificada";
    let hora = document.getElementById("hora").value || "Hora no especificada";
    let fecha = document.getElementById("fecha").value || "Fecha no especificada";
    let comentario = document.getElementById("comentario").value || "No realizo Comentario";

    let formData = new FormData();
    formData.append("PersonaID", personaID);
    formData.append("TrabajoID", trabajoID);
    formData.append("ProfesionID", profesionID);
    formData.append("descripcion", descripcion);
    formData.append("direccion", direccion);
    formData.append("hora", hora);
    formData.append("fecha", fecha);
    formData.append("comentario", comentario);

    $.ajax({
        url: '/Trabajo/AgregarTrabajo',
        data: formData,
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: "Trabajo guardado exitosamente",
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster"
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster"
                    }
                });
                $('#agregarTrabajo').modal('hide');
                LimpiarModal();
                CardTrabajos();
            } else {
                Swal.fire({
                    title: "Error al guardar el Trabajo",
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
            console.log('Disculpe, existió un problema al guardar el Trabajo');
            Swal.fire({
                title: "Oops...",
                text: "Disculpe, existió un problema al guardar el Trabajo",
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


function EditarTrabajo(TrabajoID) {
    $.ajax({
        url: '/Trabajo/RecuperarTrabajo',
        data: { id: TrabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (trabajos) {
            if (trabajos && trabajos.length > 0) {
                let trabajo = trabajos[0];


                ProfesionID
                document.getElementById("ProfesionID").value = trabajo.profesionID;
                document.getElementById("TrabajoID").value = trabajo.trabajoID;
                document.getElementById("descripcion").value = trabajo.descripcion;
                document.getElementById("hora").value = trabajo.hora;
                document.getElementById("fecha").value = trabajo.fecha;
                document.getElementById("direccion").value = trabajo.direccion;
                document.getElementById("comentario").value = trabajo.comentario;

                $('#agregarTrabajo').modal('show');
            } else {
                alert("No se encontró el trabajo especificado.");
            }
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al cargar el servicio para editar');
        }
    });
}


function EliminarTrabajo(trabajoID) {
    Swal.fire({
        title: "Quiere eliminar este trabajo?",
        text: "Esta accion no podra ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '../../Trabajo/EliminarTrabajo',
                data: { trabajoID: trabajoID },
                type: 'POST',
                dataType: 'json',
                success: function (Respuesta) {

                    CardTrabajos();


                    Swal.fire({
                        title: "!Eliminado",
                        text: "Su trabajo fue eliminado.",
                        icon: "success"
                    });
                },
                error: function (xhr, status) {
                    console.log('Disculpe, existió un problema al consultar el registro para eliminado');
                }
            });
        }
    });
}







// desde aca empiza lo relacionado al postulado de trabajo y solicitud de servicios



function PostularTrabajo(servicioID, trabajoID) {
    console.log("servicioID:", servicioID, "trabajoID:", trabajoID); 
    $.ajax({
        url: '/ContratoRespondido/SolicitarServicios',
        type: 'POST',
        data: { servicioID: servicioID, trabajoID: trabajoID },
        dataType: 'json',
        success: function (SolicitarServicio) {
            if (SolicitarServicio.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitud Exitosa',
                    text: SolicitarServicio.mensaje
                });
                $('#serviciosModal').modal('hide');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: SolicitarServicio.mensaje
                });
            }
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al solicitar el servicio');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Disculpe, existió un problema al solicitar el servicio'
            });
        }
    });
}



//en este metodo js es el de pustular en servicio solicitado
function abrirModalPostular(trabajoID) {
    // Mostrar SweetAlert2 con un mensaje de carga
    Swal.fire({
        title: 'Cargando servicios de otros usuarios...',
        html: '<div class="spinner-border text-primary" role="status"></div>',
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 1000, // El spinner estará visible durante 2 segundos
        willClose: () => {
        
            $.ajax({
                url: '/ContratoRespondido/BuscarServiciosTrabajo',
                type: 'POST',
                data: { trabajoID: trabajoID },
                success: function (ContratosRespondidoMostrar) {
                    console.log(ContratosRespondidoMostrar);
                    let contenidoTabla = ``;

                    // Verificar si hay registros
                    if (ContratosRespondidoMostrar.length === 0) {
                        Swal.fire("Sin resultados", "No se encontraron servicios para este trabajo.", "info");
                    } else {
                        // Generar contenido de la tabla con los datos recibidos
                        $.each(ContratosRespondidoMostrar, function (index, contrato) {
                            contenidoTabla += `
                                <tr>
                                    <td class="texto_modal_postular ">${contrato.nombrePersona} ${contrato.apellidoPersona}</td>
                                    <td>
                                        <button class="btn-outline-secondary_boton btn btn-outline-secondary texto_modal_postular" onclick="PostularTrabajo(${contrato.servicioID}, ${trabajoID})">Solicitar servicio</button>
                                    </td>
                                </tr>`;
                        });

                        // Actualizar el contenido de la tabla
                        document.getElementById("tbody-Contratos").innerHTML = contenidoTabla;

                        // Mostrar el modal con la tabla
                        $('#serviciosModal').modal('show');
                    }
                },
                error: function () {
                    Swal.fire("Error", "Hubo un problema al cargar los servicios.", "error");
                }
            });
        }
    });
}





// window.onload = ListadoServicioSolicitado();
// function ListadoServicioSolicitado() {
//     $.ajax({
//         url: '../../ContratoRespondido/ListadoServicioSolicitado',
//         type: 'POST',
//         dataType: 'json',
//         success: function (traerServicios) {
//             let contenidoTabla = ``;
        
//             $.each(traerServicios, function (index, traerservicio) {
//                 contenidoTabla += `
//                     <tr>
//                         <td class="ocultar-en-550px">${traerservicio.stringFechaMatch}</td> 
                       
//                         <td class="ocultar-en-550px">${traerservicio.nombrePersona}</td> 
//                         <td>${traerservicio.descripcionTrabajo}</td> 
//                         <td>${traerservicio.comentarioTrabajo}</td> 
//                            <td>${traerservicio.respuestaDesolicitudString}</td> 
//                         <td>
//                             <button type="button" class="btn btn-info me-2" onclick="AceptarRespuesta(${traerservicio.contratoRespondidoID})">Aceptar</button>
//                         </td>
//                         <td>
//                             <button type="button" class="btn btn-danger me-2" onclick="Rechazar(${traerservicio.contratoRespondidoID})">Rechazar</button>
//                         </td>
//                     </tr>`;
//             });
        
//             document.getElementById("solicitudesPendientesBody").innerHTML = contenidoTabla;
//         },
        
//         error: function (xhr, status) {
//             alert('Hubo un problema al cargar las solicitudes.');
//         }
//     });
// }
















//este es el js de ver respuestas en servicio solicitado (error del color azul aca )


function ListadoTrabajosPostulados(trabajoID) {
    $.ajax({
        url: '/ContratoRespondido/ListadoTrabajosPostulados',
        data: { trabajoID: trabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (trabajosPostulados) {
      

            if (trabajosPostulados.length === 0) {
                Swal.fire("No hay respuestas, no solicitaste servicio Alguno .", "", "warning");
                return;
            }

            let contenidoTarjetas = `<div class="row">`;

            $.each(trabajosPostulados, function (index, trabajo) {
                contenidoTarjetas += `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                        <div class="card-container-mis_l card-hoover tamanio-card" id="card-${trabajo.trabajoID}">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Detalles del trabajo y Respuesta</h5>
                                    <div class="contenido-extra mt-3">
                                        <p><strong><i class="fa-solid fa-calendar"></i> Fecha de Postulación:</strong> ${trabajo.fechaPostulacion}</p>
                                        <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del Trabajo:</strong> ${trabajo.descripcionTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${trabajo.comentarioTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-user"></i> Nombre Persona Servicio:</strong> ${trabajo.nombrePersonaServicio} ${trabajo.apellidoPersonaServicio}</p>
                                        <p><strong><i class="fa-solid fa-info-circle"></i> Estado de la Solicitud:</strong> ${trabajo.estadoSolicitud}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });

            contenidoTarjetas += `</div>`;
            document.getElementById("respuestaTrabajosPostulados").innerHTML = contenidoTarjetas;
           
            $('#miModalTodos').modal('show');
        },
        error: function (xhr, status) {
            Swal.fire("Hubo un problema al cargar los trabajos postulados.", "", "error");
        }
    });
}






function Buscartrabajorechazado(trabajoID) {
    $.ajax({
        url: '/ContratoRespondido/Buscartrabajorechazado',
        data: { trabajoID: trabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (trabajosPostulados) {
            let contenidoModal = '';

            // Validar si el backend devuelve un error
            if (trabajosPostulados.success === false) {
                contenidoModal = `
                    <div class="text-center p-4">
                        <h5 class="texto-servicios-solicitados">${trabajosPostulados.message}</h5>
                    </div>`;
                $('#respuestaTrabajosPostuladosRechazados').html(contenidoModal);
                $('#miModalRechazados').modal('show');
                return;
            }

            // Validar si no hay datos
            if (trabajosPostulados.length === 0) {
                contenidoModal = `
                    <div class="text-center p-4">
                       <h5 class="texto-servicios-solicitados" style="color: white;">No hay solicitudes disponibles para este servicio.</h5>
                    </div>`;
                $('#respuestaTrabajosPostuladosRechazados').html(contenidoModal);
                $('#miModalRechazados').modal('show');
                return;
            }

            // Limpiar el contenido previo antes de agregar las nuevas tarjetas
            let contenedor = document.getElementById("respuestaTrabajosPostuladosRechazados");
            contenedor.innerHTML = "";

            // Crear contenido dinámico de tarjetas
            let contenidoTarjetas = `<div class="row">`;
            $.each(trabajosPostulados, function (index, trabajo) {
                contenidoTarjetas += `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                        <div class="card-container-mis_l card-hoover tamanio-card" id="card-${trabajo.trabajoID}">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Detalles del trabajo y Respuesta</h5>
                                    <div class="contenido-extra mt-3">
                                        <p><strong><i class="fa-solid fa-calendar"></i> Fecha de Postulación:</strong> ${trabajo.nombrePersona}</p>
                                        <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del Trabajo:</strong> ${trabajo.apellidoPersona}</p>
                                        <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${trabajo.descripcionTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-user"></i> Nombre Persona Servicio:</strong> ${trabajo.respuestaDesolicitudString}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });

            contenidoTarjetas += `</div>`;
            contenedor.innerHTML = contenidoTarjetas;

            // Mostrar el modal
            $('#miModalRechazados').modal('show');
        },
        error: function (xhr, status) {
            Swal.fire("Hubo un problema al cargar los trabajos postulados rechazados.", "", "error");
        }
    });
}




function BuscartrabajoAceptado(trabajoID) {
    $.ajax({
        url: '/ContratoRespondido/BuscartrabajoAceptado',
        data: { trabajoID: trabajoID },
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            let contenidoModal = '';
            let contenedor = document.getElementById("respuestaTrabajosPostuladosAceptados");
            
            // Validar si la respuesta contiene un error
            if (response.success === false) {
                contenidoModal = `
                    <div class="text-center p-4">
                        <h5 class="texto-servicios-solicitados">${response.message}</h5>
                    </div>`;
                contenedor.innerHTML = contenidoModal;
                $('#miModalaceptados').modal('show');
                return;
            }
            
            // Validar si no hay datos
            if (response.length === 0) {
                contenidoModal = `
                    <div class="text-center p-4">
                       <h5 class="texto-servicios-solicitados" style="color: white;">No hay solicitudes disponibles para este servicio.</h5>
                    </div>`;
                contenedor.innerHTML = contenidoModal;
                $('#miModalaceptados').modal('show');
                return;
            }

            // Limpiar el contenido previo antes de agregar las nuevas tarjetas
            contenedor.innerHTML = "";

            // Crear tarjetas dinámicas para los trabajos postulados
            let contenidoTarjetas = `<div class="row">`;
            $.each(response, function (index, trabajo) {
                contenidoTarjetas += `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
                        <div class="card-container-mis_l card-hoover tamanio-card" id="card-${trabajo.trabajoID}">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Detalles del trabajo y Respuesta</h5>
                                    <div class="contenido-extra mt-3">
                                        <p><strong><i class="fa-solid fa-calendar"></i> Fecha de Postulación:</strong> ${trabajo.fechaPostulacion}</p>
                                        <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del Trabajo:</strong> ${trabajo.descripcionTrabajo}</p>
                                        <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${trabajo.comentario}</p>
                                        <p><strong><i class="fa-solid fa-user"></i> Nombre Persona Servicio:</strong> ${trabajo.nombrePersona}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            contenidoTarjetas += `</div>`;

            contenedor.innerHTML = contenidoTarjetas;

            // Mostrar el modal
            $('#miModalaceptados').modal('show');
        },
        error: function (xhr, status) {
            Swal.fire("Hubo un problema al cargar los trabajos postulados aceptados.", "", "error");
        }
    });
}

// function mostrarSolicitudes() {
//     // Realizar la solicitud AJAX
//     $.ajax({
//         url: '/ContratoRespondido/ListadoTrabajosPostulados',
//         data: { trabajoID: 123 }, // Asegúrate de que este ID sea correcto
//         type: 'GET',
//         dataType: 'json',
//         success: function (respuesta) {
//             // Mostrar trabajos aceptados
//             mostrarTrabajos(respuesta.aceptados, 'aceptados');

//             // Mostrar trabajos rechazados
//             mostrarTrabajos(respuesta.rechazados, 'rechazados');
//         },
//         error: function () {
//             Swal.fire("Hubo un problema al cargar las solicitudes.", "", "error");
//         }
//     });
// }






// function mostrarSolicitudes(estado) {
//     // Definir el texto del título según el estado
//     let titulo = estado === 1 ? 'Solicitudes Aceptadas' : 'Solicitudes Rechazadas';


//     // Realizar la solicitud AJAX para cargar las solicitudes según el estado
//     $.ajax({
//         url: '/ContratoRespondido/EstadoSolicitud', // Asegúrate de que esta ruta sea la correcta
//         data: { trabajoID: 123, estado: estado }, // Pasar el estado (1 = Aceptado, 2 = Rechazado)
//         type: 'GET',
//         dataType: 'json',
//         success: function (trabajosPostulados) {
//             if (trabajosPostulados.length === 0) {
//                 document.getElementById("respuestaTrabajosPostulados").innerHTML = `
//                     <div class="alert alert-warning text-center">
//                         No hay solicitudes para mostrar.
//                     </div>`;
//             } else {
//                 // Construir el contenido de las tarjetas
//                 let contenidoTarjetas = `<div class="row">`;
//                 trabajosPostulados.forEach(function (trabajo) {
//                     contenidoTarjetas += `
//                         <div class="col-sm-12 col-md-6 col-lg-4 mb-3">
//                             <div class="card">
//                                 <div class="card-body">
//                                     <h5 class="card-title text-center">Detalles del trabajo y respuesta</h5>
//                                     <div class="contenido-extra mt-3">
//                                         <p><strong><i class="fa-solid fa-calendar"></i> Fecha de Postulación:</strong> ${trabajo.FechaPostulacion}</p>
//                                         <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del Trabajo:</strong> ${trabajo.DescripcionTrabajo}</p>
//                                         <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${trabajo.ComentarioTrabajo}</p>
//                                         <p><strong><i class="fa-solid fa-user"></i> Nombre Persona Servicio:</strong> ${trabajo.NombrePersonaServicio} ${trabajo.ApellidoPersonaServicio}</p>
//                                         <p><strong><i class="fa-solid fa-info-circle"></i> Estado de la Solicitud:</strong> ${trabajo.EstadoSolicitud}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>`;
//                 });
//                 contenidoTarjetas += `</div>`;
//                 document.getElementById("respuestaTrabajosPostulados").innerHTML = contenidoTarjetas;
//             }

//             // Mostrar el modal
//             $('#modalTrabajos').modal('show');
//         },
//         error: function () {
//             Swal.fire("Hubo un problema al cargar las solicitudes.", "", "error");
//         }
//     });
// }








// function CardTrabajosDetalle() {
//     $.ajax({
//         url: '/Trabajo/CardTrabajosDetalle', // Cambia la URL si es necesario
//         data: {  }, // Pasa el trabajoID en los datos
//         type: 'POST',
//         dataType: 'json',
//         success: function (tiposProfesionMostrar) {
//             console.log(tiposProfesionMostrar); // Verificar los datos recibidos

//             let contenidoCard = `<div class="row">`;
//             let trabajosEncontrados = false;

//             $.each(tiposProfesionMostrar, function (index, tipoProfesion) {
//                 if (tipoProfesion.listadoPersonas && tipoProfesion.listadoPersonas.length > 0) {
//                     trabajosEncontrados = true;
//                     $.each(tipoProfesion.listadoPersonas, function (index, persona) {
//                         contenidoCard += `
//                             <div class="col-md-4 mb-3 cartas_card" id="card-${persona.trabajoID}">
//                                 <div class="card card-container-mis_trabajo_detalle card h-100">
//                                     <div class="row g-0 h-100 padin">
//                                         <h5 class="card-title text-center">${tipoProfesion.nombre}</h5>
//                                         <p><strong><i class="fa-solid fa-location-dot"></i> Dirección:</strong> ${persona.direccion}</p>
//                                         <p><strong><i class="fa-solid fa-list"></i> Descripción:</strong> ${persona.descripcion}</p>
//                                         <p><strong><i class="fa-regular fa-clock"></i> Hora:</strong> ${persona.horastring}</p>
//                                         <p><strong><i class="fa-regular fa-calendar"></i> Fecha de inicio:</strong> ${persona.fechastring}</p>
//                                         <p><strong><i class="fa-solid fa-comment"></i> Comentario:</strong> ${persona.comentario}</p>
//                                     </div>
//                                 </div>
//                             </div>`;
//                     });
//                 }
//             });

//             contenidoCard += `</div>`;

//             if (!trabajosEncontrados) {
//                 contenidoCard = `
//                     <div class="alert alert-warning text-center" role="alert">
//                         No hay detalles del trabajo disponibles.
//                     </div>`;
//             }

//             document.getElementById("contenedorCardsmodal").innerHTML = contenidoCard;
//         },
//         error: function (xhr, status) {
//             alert('Hubo un problema al cargar los detalles del trabajo.');
//         }
//     });
// }


// document.addEventListener("DOMContentLoaded", CardTrabajosDetalle);