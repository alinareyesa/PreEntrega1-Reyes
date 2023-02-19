let carrito = new Carrito([])

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")) {
        console.log("holaaaaaaa");
        carrito.productos = JSON.parse(localStorage.getItem("carrito"))
    }
})

const cardProductos = document.getElementById("card-productos")
const verCarrito = document.getElementById("ver-carrito")
const carritoContenedor = document.getElementById("carrito-contenedor")

async function getAllItems() {
    const get = await fetch("/javascript/items.json")
    let items = await get.json()
    return items
}

async function mostrarItems() {
    const items = await getAllItems()
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
            carrito.agregarCarrito(item.id)
            Toastify ({
                text: "Se agregó al carrito",
                duration: 2000,
                close: true,
                gravity: "bottom",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #f772b7, #ffc4df)",
                  }
            }).showToast();
        })
    
    })
}

mostrarItems()


verCarrito.addEventListener("click",() => {
    actualizarVistaCarrito()
})

function actualizarVistaCarrito () {
    carritoContenedor.innerHTML = ""
    carritoContenedor.style.display= "block"
    const carritoContenedorTitulo = document.createElement("div")
    carritoContenedorTitulo.className = "carrito-contenedor-titulo"
    carritoContenedorTitulo.innerHTML = `
    <h2>Mi carrito</h2>
    <button class="boton-cerrar" id="boton-cerrar-carrito">X</button>
    `

    carritoContenedor.append(carritoContenedorTitulo)

    const botonCerrarCarrito = document.getElementById("boton-cerrar-carrito")
    botonCerrarCarrito.addEventListener("click", () => {
        carritoContenedor.style.display = "none"
    })


    carrito.productos.forEach((item) => {
        let carritoContenido = document.createElement("div")
        carritoContenido.className = "carrito-contenedor-contenido"
        carritoContenido.innerHTML = `
        <img src="${item.img}"/>
        <h3>${item.nombre}</h3>
        <p>$ ${item.precio} c/u</p>
        <p>x${item.cantidad}</p>
        <button class="boton-eliminar" id="boton-eliminar-${item.id}" >Eliminar</button>
        `
        carritoContenedor.append(carritoContenido)

        const botonEliminarItem = document.getElementById(`boton-eliminar-${item.id}`)
        botonEliminarItem.addEventListener("click", () => {carrito.eliminarItem(item)})
    })

    const total = carrito.productos.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0)
    const carritoTotal = document.createElement("div")
    carritoTotal.className = ("carrito-contenedor-total")
    carritoTotal.innerHTML = `
    <div class="total">
    <p>Total: $${total}</p>
    </div>
    <button id="boton-vaciar" class="boton-vaciar">Vaciar carrito</button>
    <button id="boton-realizar-compra" class="boton-realizar-compra">Realizar compra</button>
    `

    carritoContenedor.append(carritoTotal)

    const botonVaciarCarrito = document.getElementById("boton-vaciar")
    botonVaciarCarrito.addEventListener("click", () => {
        if (carrito.productos.length == 0) 
        {
            swal({
                icon: "error",
                text: "No tienes ningun producto en tu carrito",
            })
        }
        else{
            swal({
                icon: "warning",
                title: "¿Está seguro de que quiere vaciar su carrito?",
                buttons: true,
    
            }).then((willDelete) => {
                console.log(willDelete);
                if (willDelete) 
                {
                    carrito.vaciarCarrito();
                    swal({
                        icon: "success",
                        title: "Su carrito ha sido vaciado"
                    })
                }
            })
        }
    })

    const botonRealizarCompra = document.getElementById("boton-realizar-compra")
    botonRealizarCompra.addEventListener("click", () => {
        if (carrito.productos.length == 0) 
        {
            swal({
                icon: "error",
                text: "No tienes ningun producto en tu carrito",
            })
        }
        else {
            swal({
                icon: "warning",
                title: "¿Está seguro de que realizar la compra?",
                buttons: true,
            }).then((value) => {
                if (value) 
            {
                carrito.vaciarCarrito();
                swal({
                    icon: "success",
                    title: "Su compra ha sido realizada"
                })
            }
            })
        }
    })

    localStorage.setItem("carrito", JSON.stringify(carrito.productos))

}