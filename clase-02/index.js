// variables
// LET --> variable
// CONST --> constante que no se pueden cambiar, si se puede cmabiar los nuevos valores de un array

// funciones: bloques de codigo que trabajan dentro de un scope interno

function sumarDosNumeros (num1,num2) {
    let resultado
    resultado = num1 + num2
    return resultado
}

function multiplicarDosNumeros(num1,num2){
    let resultado
    resultado = num1 * num2
    return resultado
}

// FUNCION DE FLECHA TIENE UN RETUR IMPLICITO
const multiplicoar = (num1,num2) => num1*num2

// caudno se pasa un solo valor no hace ponerlo en paréntesis
const cuadrado = num => num*num

//DATA EXTRA --> https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Functions

// Template string
// se puede agregar contenido sin concatenarlo y recono los saltos de línea

let color = "Rojo"
`esto es un la variable ${variable}`

//CLASES
// funcion como moldes ya que cuando esta definidoas podes crear distintos objetos
// cada objeto esuna instancia

class nombreDeMiClase {
    // el metodo se llama constructor
    constructor(parametrosDeCreacion){
        console.log("nuevo Objeto Creado")
        this.variableInterna = 2
    }

    static variableEstatica = 4

    metodo(){
        console.log("soy un metodo de clase")
    }
    metodo2 = () => {
        console.log(`soy una funcion flecha: ${this.variableEstatica}`)
    }

}

let instancia = new nombreDeMiClase()

console.log(instancia.variableInterna)
instancia.metodo1()
instancia.metodo2()

nombreDeMiClase.variableEstatica

/// DATE EXTRA --> https://lenguajejs.com/javascript/oop/clases/




