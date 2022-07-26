class Producto{
    constructor(id, nombre, imagen, precio){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
    }
}

class Carrito { 
    constructor(id, ){
        this.id = id;
        this.productos = [];
    }

calcularTotal (){
    let total = 0;
    for(let i = 0; i < this.productos.length; i++){
        total = total + this.productos[i].precio;
    }
    return total
}

}


function renderCard(producto){
    let cardRendered= `                
    <div class=" row-cols-md-3 g-4 cards-galeria">    
        <div class="card h-100  m-3">
            <img src="./img/burguers/${producto.imagen}" class="card-img-top" alt="4quesos" />
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">
                    $ ${producto.precio}
                </p>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-dark btn-sm id botonCompra" id="${producto.id}">Agregar</button>
            </div>
        </div>
    </div>`;
    return cardRendered;
}

function limpiarCarrito(){
    let divCarrito = document.querySelector("#carrito");
    divCarrito.innerHTML = "";
}

function actualizarCarrito(carrito){
    let divCarrito = document.querySelector("#carrito");
    carrito.productos.forEach(producto =>{
        divCarrito.innerHTML += renderCard(producto);
    })
    divCarrito.innerHTML += `<h1>Precio Total: $ ${carrito.calcularTotal()}</h1>`
}

function renovarStorage(){
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.addEventListener('DOMContentLoaded', (e) =>{
    let storage = JSON.parse(localStorage.getItem('carrito'));
    let carritoGuardado = new Carrito(storage.id, storage.productos);
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto);
    })
    limpiarCarrito();
    actualizarCarrito(carritoGuardado);
})




let catalogoProductos= []
let producto1 = new Producto(1, "4 quesos", "4quesos.jpg", 665);
let producto2 = new Producto(2, "Club", "burguer-Club.jpg", 745);
let producto3 = new Producto(3, "delizia", "Delizia.jpg", 765);
catalogoProductos.push(producto1);
catalogoProductos.push(producto2);
catalogoProductos.push(producto3);



let cardsDiv = document.querySelector("#cards-proof");



catalogoProductos.forEach(producto =>{   
    cardsDiv.innerHTML += renderCard(producto);
})



let carrito = new Carrito(1);

let botones = document.querySelectorAll(".botonCompra");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach(boton =>{
    boton.addEventListener("click", (e) =>{
        // console.log(e.target.id);
        let productoSeleccionado =  catalogoProductos.find(producto => producto.id == e.target.id);
        carrito.productos.push(productoSeleccionado);
        console.log(carrito);
        console.log(carrito.calcularTotal())
        limpiarCarrito();
        actualizarCarrito(carrito);
        renovarStorage();
    })

})


