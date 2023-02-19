class Carrito {
    productos;

    constructor(productos)
    {
        this.productos = productos
    }

    async agregarCarrito (idProducto) {
        const items = await getAllItems()
        let itemEncontradoCarrito = this.carritoContainsItem(idProducto)
        items.forEach((item) => {
            if (item.id == idProducto && itemEncontradoCarrito != undefined) {
                itemEncontradoCarrito.cantidad += 1
            }
            else if (item.id == idProducto) {
                this.productos.push(new Producto(item.id,item.nombre,item.precio,item.img,1))
            }
        })
        console.log(this.productos)
    }

     carritoContainsItem(id) {
        let itemEncontrado = this.productos.find((item) => {
            return item.id == id
        })
        return itemEncontrado
    }

    eliminarItem (itemAEliminar) {
        this.productos.forEach((itemCarrito, indice) => {
            if (itemCarrito.id == itemAEliminar.id && itemCarrito.cantidad > 1)
            {
                itemCarrito.cantidad -= 1
            }
            else if (itemCarrito.id == itemAEliminar.id){
                this.productos.splice(indice, 1)
            }
        })
        actualizarVistaCarrito();
    }

    vaciarCarrito() {
        this.productos = []
        actualizarVistaCarrito()
    }
    
}

