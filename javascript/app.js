let carrito = []

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
})

const cardProductos = document.getElementById("card-productos")
const verCarrito = document.getElementById("ver-carrito")
const carritoContenedor = document.getElementById("carrito-contenedor")

items.forEach((item) => {
    let productosDiv = document.createElement("div")
    productosDiv.classList = "productos-card"
    productosDiv.innerHTML = `
    <img class="imagenes-productos" src="${item.img}"/>
    <h3>${item.nombre}</h3>
    <p>$${item.precio}</p>
    <button id="comprar-${item.id}">Agregar al carrito</button>
    `
    cardProductos.appendChild(productosDiv)

    const botonComprar = document.getElementById(`comprar-${item.id}`)
    
    botonComprar.addEventListener("click", () => {
        agregarCarrito(item.id)
    })

})

function agregarCarrito (idProducto) {
    let producto = items.find((item) => {
        return item.id == idProducto
        //console.log(item.id + "   " + idProducto)
    })
    console.log(producto);
    carrito.push(producto)
}

verCarrito.addEventListener("click",() => {
    actualizarCarrito()
})

function actualizarCarrito () {
    carritoContenedor.innerHTML = ""
    carritoContenedor.style.display= "block"
    const carritoContenedorTitulo = document.createElement("div")
    carritoContenedorTitulo.className = "carrito-contenedor-titulo"
    carritoContenedorTitulo.innerHTML = `
    <h2>Mi carrito</h2>
    <button id="boton-cerrar-carrito">X</button>
    `

    carritoContenedor.append(carritoContenedorTitulo)

    const botonCerrarCarrito = document.getElementById("boton-cerrar-carrito")
    botonCerrarCarrito.addEventListener("click", () => {
        carritoContenedor.style.display = "none"
    })

    carrito.forEach((item) => {
        let carritoContenido = document.createElement("div")
        carritoContenido.className = "carrito-contenedor-contenido"
        carritoContenido.innerHTML = `
        <img src="${item.img}"/>
        <h3>${item.nombre}</h3>
        <p>${item.precio}</p>
        <button id="boton-eliminar-${item.id}" >Eliminar</button>
        `
        carritoContenedor.append(carritoContenido)

        const botonEliminarItem = document.getElementById(`boton-eliminar-${item.id}`)
        botonEliminarItem.addEventListener("click", () => {eliminarItem(item.id)})
    })

    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)
    const carritoTotal = document.createElement("div")
    carritoTotal.className = ("carrito-contenedor-total")
    carritoTotal.innerHTML = `
    <p>Total: $${total}</p>
    `
    carritoContenedor.append(carritoTotal)
    localStorage.setItem("carrito", JSON.stringify(carrito))

}

function eliminarItem (id) {
    carrito = carrito.filter((item) => item.id !== id)
    actualizarCarrito();
}
