let montoTotal = 0

function agregarAlTotal(monto) {

    montoTotal = montoTotal + monto
    menuPrincipal()
}

let item1 = 250
let item2 = 300
let item3 = 450

function menuPrincipal() {
    
    let opcion
    do {
        opcion = prompt ("Seleccione un item \n 1- Item 1 \n 2- Item 2 \n 3- Item 3 \n 4- Listo \n 5- Salir ")
        opcion = parseInt (opcion)
        switch(opcion)
        {
            case 1: 
                 agregarAlTotal(item1)
                 break
            
            case 2: 
                 agregarAlTotal (item2)
                 break
    
            case 3: 
                 agregarAlTotal (item3)
                 break
    
            case 4: 
                if (montoTotal == 0) {
                    alert ("No tiene productos en el carrito")
                }
                else {
                    cuponDescuento()
                }
                 break
            case 5:
                break
            default:
                alert("Opcion invalida")
        }
    } while (opcion !=5)
}

menuPrincipal()

function cuponDescuento() {
    let opcion = prompt ("El monto final es " +montoTotal + "\n ¿Quiere usar un cupon de descuento? \n (1- si \n 2- no)")
    opcion = parseInt (opcion)
    switch(opcion)
    {
        case 1: 
            let cupon = prompt ("Escriba su cupon de descuento \n (DIEZ: 10% de descuento \n QUINCE:15% de descuento")
            aplicarDescuento (cupon)

        case 2: 
            break

        default: 
            alert ("Opcion invalida")
            cuponDescuento()
    }
}

function aplicarDescuento(cupon) {

    if (cupon == "DIEZ") {
        let descuento = montoTotal * 0.1
        montoTotal = montoTotal - descuento
        alert("El monto final es " + montoTotal)
    }
    else if (cupon == "QUINCE") {
        let descuento = montoTotal * 0.15
        montoTotal = montoTotal - descuento
        alert("El monto final es " + montoTotal)
    }
    else {
        alert("Cupon invalido")
        cuponDescuento()
    }

}