function CardServicios() {
    let profesionID = $("#profesionBuscarID").val();
    let localidadID = $("#localidadbuscarID").val();

    $.ajax({
        url: '/VistaServicio/CardServicios',
        data: { ProfesionID: profesionID },
        type: 'POST',
        dataType: 'json',
        success: function (tiposProfesionMostrar) {
            console.log(tiposProfesionMostrar);

            let contenidoCard = ``;
            // Verificar si el resultado está vacío
            if (tiposProfesionMostrar.length === 0) {
                contenidoCard = `
            <div class="alert alert-warning text-center mt-4">
                <i class="fa-solid fa-exclamation-circle"></i>
                No se encontraron Servicios para la búsqueda seleccionada.
            </div>`;
            } else
                $.each(tiposProfesionMostrar, function (index, tipoProfesion) {
                    const colorClass = `profesion-color-${index % 3}`;
                    contenidoCard += `
                    <div class="profesion-group ${colorClass}">
                        <h3 class="titulo-vista">${tipoProfesion.nombre}</h3>
                        <div class="row justify-content-start">`;

                    $.each(tipoProfesion.listadoPersonas, function (index, persona) {
                        contenidoCard += `
                        <div class="col-sm-12 col-md-6 col-lg-4 mb-3 D">
                            <div class="card-container-mis-vista  tamanio-card" id="card-${persona.servicioID}">
                                <div class="card">
                                    <div class="card-body color-card">
                                      
                                        <div class="contenido-extra mt-3">
                                                                                    <p class="textovista"><strong><i class="fa-regular fa-user"></i> Nombre:</strong> ${persona.nombrePersona} ${persona.apellidoPersona}</p>
                                                                                   <p class="textovista"><i class="fa-solid fa-phone"></i> Teléfono: 
                                                                                   <a href="https://wa.me/${persona.telefonoPersona}" target="_blank"> 
                                                                                       ${persona.telefonoPersona}
                                                                                             </a>
                                                                                               </p>

                                            <p class="textovista"><strong><i class="fa-solid fa-building-columns"></i> Instituto/Lugar que se especializó:</strong> ${persona.institucion}</p>
                                            <p class="textovista"><strong><i class="fa-solid fa-book"></i> Título en que se especializa:</strong> ${persona.titulo}</p>
                                            <p class="textovista"><strong><i class="fa-regular fa-file-lines"></i> Descripción del servicio:</strong> ${persona.descripcion}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    });
                });


            document.getElementById("contenedorCards").innerHTML = contenidoCard;
        },
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al cargar los servicios');
        }
    });
}

// Llama a la función para cargar las tarjetas al cargar la página
document.addEventListener("DOMContentLoaded", CardServicios);








function EliminarServicio(servicioID) {
    $.ajax({
        // la URL para la petición
        url: '../../VistaServicio/EliminarServicio',
        data: { servicioID: servicioID },
        type: 'POST',
        dataType: 'json',
        success: function (Respuesta) {
            CardServicios();
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema al consultar el registro para eliminado');
        }
    });
}




function cargarPerfil(servicioID) {

    window.location.href = `/Servicios/VistaServicio/${servicioID}`;
}