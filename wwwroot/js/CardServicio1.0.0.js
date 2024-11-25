function CardServicios() {
    $.ajax({
        url: '/Servicios/CardServicios',
        data: {},
        type: 'POST',
        dataType: 'json',
        success: function (tiposProfesionMostrar) {
            console.log(tiposProfesionMostrar);
            LimpiarModal();
            let contenidoCard = ``;
            let ServicioEncontrados = false;
            $.each(tiposProfesionMostrar, function (index, tipoProfesion) {
                ServicioEncontrados = true;
                $.each(tipoProfesion.listadoPersonas, function (index, persona) {
                    contenidoCard += `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-3 D">
                        <div class="card-container-mis card-hoover tamanio-card" id="card-${persona.servicioID}">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${tipoProfesion.nombre}</h5>
                                    <a href="javascript:cargarPerfil(${persona.servicioID})" class="text-decoration-none text-dark">
                                    </a>
                                    <div class="contenido-extra mt-3">
                                        <p><strong><i class="fa-solid fa-building-columns"></i> Instituto/Lugar que se especializo:</strong> ${persona.institucion}</p>
                                        <p><strong><i class="fa-solid fa-book"></i> Título en que se especializa:</strong> ${persona.titulo}</p>
                                        <p><strong><i class="fa-regular fa-file-lines"></i> Descripción del servicio:</strong> ${persona.descripcion}</p>
                                        <div class="d-flex flex-column flex-md-row align-items-center gap-2 mt-3">
                                            <button type="button" class="btn btn-outline-success" onclick="EditarServicio(${persona.servicioID})">
                                                <i class="fa-regular fa-pen-to-square"></i> Editar
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalServicioSolicitado" onclick="ListadoServicioSolicitado(${persona.servicioID})">
                                                <i class="fa-regular fa-pen-to-square"></i> Servicio solicitado
                                            </button>
                                            <button type="button" class="btn btn-outline-danger" onclick="EliminarServicio(${persona.servicioID})">
                                                <i class="fa-regular fa-trash-can"></i> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
            });

            if (!ServicioEncontrados) {
                contenidoCard = `
                    <div class="alert alert-warning text-center" role="alert">
                        No hay prestaciones suyas postuladas.
                    </div>`;
            }

            document.getElementById("contenedorCards").innerHTML = contenidoCard;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al cargar los servicios');
        }
    });
}
function LimpiarModal() {
 
    document.getElementById("ServicioID").value = 0;  
    document.getElementById("ProfesionID").selectedIndex = 0; 
    document.getElementById("descripcion").value = "";  
    document.getElementById("titulo").value = "";  
    document.getElementById("institucion").value = "";  
}
// Llama a la función para cargar las tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", CardServicios);



// function agregarServicio() {
//     let personaID = document.getElementById("PersonaID").value;
//     let servicioID = document.getElementById("ServicioID").value;
//     let profesionID = document.getElementById("ProfesionID").value;
//     // let herramienta = document.getElementById("herramienta").checked;
//     let descripcion = document.getElementById("descripcion").value || "Descripción pendiente"; // Valor predeterminado
//     let titulo = document.getElementById("titulo").value || "Título temporal"; // Valor predeterminado
//     let institucion = document.getElementById("institucion").value || "Institución sin especificar"; // Valor predeterminado

//     // Crear un objeto FormData para enviar archivos
//     let formData = new FormData();
//     formData.append("ServicioID", servicioID);
//     formData.append("PersonaID", personaID);
//     formData.append("ProfesionID", profesionID);
//     // formData.append("Herramienta", herramienta);
//     formData.append("Descripcion", descripcion);
//     formData.append("Titulo", titulo);
//     formData.append("Institucion", institucion);

//     $.ajax({
//         url: '/Servicios/AgregarServicio',
//         data: formData,
//         type: 'POST',
//         dataType: 'json',
//         processData: false,
//         contentType: false,
//         success: function (response) {
//             if (response.success) {
//                 alert("Servicio guardado exitosamente");
//                 $('#agregarServicio').modal('hide');

//                 CardServicios();



//                 alert("Error al guardar el servicio: " + response.message);
//             }
//         },
//         error: function (xhr, status) {
//             console.log('Disculpe, existió un problema al guardar el servicio');
//         }
//     });
// }



function EditarServicio(ServicioID) {

    {
        $.ajax({
            url: '/Servicios/RecuperarPerfilServicio',
            data: { id: ServicioID },
            type: 'POST',
            dataType: 'json',
            success: function (servicios) {
                let servicio = servicios[0];


                document.getElementById("ProfesionID").value = servicio.profesionID;
                document.getElementById("ServicioID").value = servicio.servicioID;
                document.getElementById("descripcion").value = servicio.descripcion;
                document.getElementById("titulo").value = servicio.titulo;
                document.getElementById("institucion").value = servicio.institucion;
                $('#agregarServicio').modal('show');
                CardServicios();
            },



            error: function (xhr, status) {
                console.log('Disculpe, existió un problema al cargar el servicio para editar');
            }
        });
    }


}




function EliminarServicio(servicioID) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '../../Servicios/EliminarServicio',
                data: { servicioID: servicioID },
                type: 'POST',
                dataType: 'json',
                success: function (Respuesta) {
                    // Llama a CardServicios para actualizar la lista
                    CardServicios();

                    // Muestra un mensaje de éxito
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El servicio ha sido eliminado.",
                        icon: "success"
                    });
                },
                error: function (xhr, status) {
                    console.log('Disculpe, existió un problema al consultar el registro para eliminar');
                }
            });
        }
    });
}





function cargarPerfil(servicioID) {

    window.location.href = `/Servicios/VistaServicio/${servicioID}`;
}