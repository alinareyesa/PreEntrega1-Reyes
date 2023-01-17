class Carrito {
    productos = []


    agregarProducto(producto) {
        this.productos.push(producto)
    }

    sacarProducto(producto) {
        let indice = this.productos.indexOf(producto)
        if (indice) {
            this.productos.splice(indice,1)
        }
    }

    calcularTotal () {
        let total = 0
        this.productos.forEach((elemento) => {
            total = total + elemento.precio;
        }) 
        return total
    }

    aplicarDescuento (porcentaje) {
        let total = this.calcularTotal()
        let descuento = total * (porcentaje / 100)
        let totalDescuento = total - descuento
        return totalDescuento
    }

    mostrarCarrito () {
        let resultado = ""
        this.productos.forEach((elemento) => {
            resultado = resultado + elemento.nombre + " ";
        })
        return resultado
    }

    vaciarCarrito () {
        this.productos = []
    }
}