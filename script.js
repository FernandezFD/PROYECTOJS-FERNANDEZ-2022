
AOS.init();
let carrito=JSON.parse(localStorage.getItem("carrito"))||[];
let lista=document.getElementById("milista");

//LUXON
const DateTime=luxon.DateTime;
const inicio=DateTime.now();
console.log(inicio.toString());
console.log(inicio.toLocaleString(DateTime.DATE_FULL));

//renderizar
renderizarProductos();

function renderizarProductos() {
    for (const producto of productos) {
        lista.innerHTML+=`<li data-aos="flip-left" class="col-sm-3 list-group-item">
        
        <img src=${producto.foto} class="img-fluid">
        <p> ${producto.nombre}</p>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }
    //eventos
    productos.forEach(producto => {
        //Evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener('click', function() {
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);

    Swal.fire(
        "Producto: "+productoNuevo.nombre,
        "Agregado al carrito",
        "success"
    );
    document.getElementById("tablabody").innerHTML+=`
    <tr>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.nombre}</td>
        <td>${productoNuevo.precio}</td>
    </tr>`;
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
        title: 'Compra confirmada',
        text: 'Estamos preparando su envio',
        imageUrl: '/images/ok.jpg',
        imageWidth: 170,
        imageHeight: 160,
        imageAlt: 'ok',
    });
    //borrar tabla, array carrito y local storage
    
    //Toastify
    Toastify({
        text:"Gracias por tu compra",
        duration:2500,
        gravity:"top",
        position:"right"
    }).showToast();

    //LUXON
    //AL momento de cerrar la compra...
    const fin=DateTime.now();
    const Interval=luxon.Interval;
    const tiempo=Interval.fromDateTimes(inicio,fin);
    console.log("Tardaste "+tiempo.length('minutes')+" minutos en cerrar la compra!");
}


