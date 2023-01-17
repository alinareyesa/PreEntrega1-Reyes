const producto1 = new Producto ("Choker goth", 250, "choker")
const producto2 = new Producto ("Choker lolita", 300, "choker")
const producto3 = new Producto ("Headband lolita", 450, "headband")
const producto4 = new Producto ("Headband goth", 420, "headband")
const carrito = new Carrito ()
const todosLosProductos = [producto1, producto2, producto3, producto4]

function menuPrincipal() { 
    let opcion
    do {
        opcion = prompt ("Seleccione un producto \n 1- Choker goth \n 2- Choker lolita \n 3- Headband lolita \n 4- Headband goth \n 5- Filtrar por categoria \n 6- Listo \n 7- Salir ")
        opcion = parseInt (opcion)
        console.log(opcion)
        switch(opcion)
        {
            case 1: 
                carrito.agregarProducto(producto1)
                alert ("Producto agregado. Tu carito tiene: " + carrito.mostrarCarrito())
                 break
            
            case 2: 
                 carrito.agregarProducto(producto2)
                 alert ("Producto agregado. Tu carito tiene: " + carrito.mostrarCarrito())
                 break
    
            case 3: 
                 carrito.agregarProducto(producto3)
                 alert ("Producto agregado. Tu carito tiene: " + carrito.mostrarCarrito())
                 break

            case 4:
                carrito.agregarProducto(producto4)
                alert ("Producto agregado. Tu carito tiene: " + carrito.mostrarCarrito())
                break

            case 5:
                const categoria = prompt ("Ingrese la categoría \n choker \n headband")
                const nombresProductosFiltrados = filtrarCategoria(categoria)
                if (nombresProductosFiltrados.length > 0) {
                    alert ("Los productos de la categoria " + categoria + " son: " + nombresProductosFiltrados)
                }
                else {
                    alert ("No existe esa categoria")
                }
                break

            case 6: 
                if (carrito.calcularTotal () == 0) {
                    alert ("No tiene productos en el carrito")
                }
                else {
                    cuponDescuento()
                }
                 break
            case 7:
                break
            default:
                alert("Opcion invalida")
        }
    } while (opcion != 7)
}

menuPrincipal()

function filtrarCategoria (categoria) {
    const filtro = todosLosProductos.filter ((producto) => {
        return producto.categoria == categoria;
    })
    let nombresCategoria = ""
    filtro.forEach ((elemento) => {
        nombresCategoria = nombresCategoria + elemento.nombre + " ";
    })
    return nombresCategoria;
}

function cuponDescuento() {
    let opcion = prompt ("El monto final es " + carrito.calcularTotal() + "\n ¿Quiere usar un cupon de descuento? \n (1- si \n 2- no)")
    opcion = parseInt (opcion)
    switch(opcion)
    {
        case 1: 
            const cupon = prompt ("Escriba su cupon de descuento \n (DIEZ: 10% de descuento \n QUINCE:15% de descuento")
            aplicarDescuento (cupon)
            break

        case 2: 
            carrito.vaciarCarrito()
            break

        default: 
            alert ("Opcion invalida")
    }
}

function aplicarDescuento(cupon) {
    let total = 0
    if (cupon == "DIEZ") {
        total = carrito.aplicarDescuento (10)
        alert("El monto final es " + total)
        carrito.vaciarCarrito()
    }
    else if (cupon == "QUINCE") {
        total = carrito.aplicarDescuento (15)
        alert("El monto final es " + total)
        carrito.vaciarCarrito()
    }
    else {
        alert("Cupon invalido")
    }

}