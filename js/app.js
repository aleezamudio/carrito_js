//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click',agregarCurso );

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //muestra los Insumos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    })

    //Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[];

        LimpiarHTML();//Eliminamos todo el HTML
    })
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();


    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado); 
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if( e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
    
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    console.log(curso);

    //Crear un objeto con el contido del cruso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito=[...cursos];  
    } else {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el Carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    LimpiarHTML();
    //Recorre el carrito y genera el HTML

    articulosCarrito.forEach( curso => {
        const {imagen,titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width ="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    });

    //Agregar el carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function LimpiarHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

//Utilizando JQUERY
//Selector
$(document).ready(function () {

    $("#encabezado").append("<p><h2>(Consultar stock)</h2></p>");
    $('#encabezado').click(function () {

       $('.encabezado').fadeOut(4000);
       $('#busqueda').animate({
            width: -80,
            heigth: 20
       })
    });
    
});
//Evento
$('#encabezado').click(function () {

    alert("Hay stock");
});
//animcaciones
$('#encabezado').click(function () {

    alert("Hay stock");
});
//Animate
$(document).ready(function () {

       $('#busqueda').animate({
            width: 550,
            heigth: 20
       })
});
//Encadenar animaciones
$(document).ready(function () {

    $('.card').css("color","brown")
         .slideUp(2000)
         .slideDown(2000)

});


//POST al API

$( document ).ready(function() {
    
    const APIURL = 'https://jsonplaceholder.typicode.com/posts' ; 
    
    const infoPost =  { finalizar: "Compra Realizada" }
    
    $("table").prepend('<button id="btn1">Finalizar</button>');
    
    $("#btn1").click(() => { 
        $.ajax({
            method: "POST",
            url:  APIURL,
            data: infoPost,
            success: function(respuesta){
                $("#carrito").prepend(`<div id="resp">${respuesta.finalizar}</div>`);
            }
        });
    });
});

//Encadenar animaciones(FINALIZAR)
$(document).ready(function () {

    $('#btn1').css("color","red")
         .slideUp(1000)
         .slideDown(1000)

});
