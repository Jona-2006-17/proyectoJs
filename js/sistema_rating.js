const ratingContainer = document.querySelector('.rating'); //capturaramos el contendor de estrellitas
let currentValue = 0 //Almacenamos el valor actual de la calificación, en este caso 0 por lo q ninguna estrella ha sido seleccionada
const limite = 5 //Cantidad limite de estrellas a crear/manipular


//creamos una constante html donde: 
//(Array(limite)) crea un arreglo vacio, donde nada es visible pero tiene una longitud de 5
//Con Array.from lo que hacemos es convertir ese arreglo en uno "real", uno manipulable en donde ya hay 5 elementos en undefinend
//.map es un elemento q recorre todo el arreglo y a dentro de este hay un parametro (item, i) q  hace referencia a: item==undefinded (en realidad no lo utilizamos, lo q nos importa es el indice) i==indice para crear cada cadena de texto unica "ITEM SIEMPRE VA A SER REFERENCIA DE LO Q HAY DENTRO DEL ARREGLO, SEA EL Q SEA Y I A SU INDICE"
//return es el ayudante de .map lo q hace es devolver un valor, y ese valor se usa para llenar el nuevo arreglo generado por .map()
const html = Array.from(Array(limite)).map((item, i)=>{
    //                                       pos=posición
    return `<div class="item item-${i}" data-pos="${i}"></div>`
}) ;
                // convertir el array en texto en el html
ratingContainer.innerHTML=html.join('')

//querySelectorAll nos va a crear un NodeList ( NodeList es un tipo de colección de nodos que contiene todos los elementos que coinciden con el selector CSS (.item en este caso).)
//.forEach(item => { ... }) .forEach recorre esa NodeList asegurandose de que se le aplique todo lo q se haga en la fuynción item, y en cada iteración item hace referencia al elemento actual en esa iteración (un div con la clase item). item es simplemente el nombre del parámetro/función
//.forEach(item=>{  El nombre item tiene el único propósito de representar a cada elemento individual mientras .forEach() recorre la lista
document.querySelectorAll('.item'). forEach(item=>{
    item.addEventListener('mouseover', evento =>{
        //console.log('Hola');
        //item.getAttribute('data-pos') obtiene el valor del atributo data-pos del elemento item
        //se obtiene y almacena el valor/atributo de data-pos en la constante, entonces si data-pos en el html es igual a data-pos="1" se guardara en esta constante como 1 string
        const pos = item.getAttribute('data-pos');

        if(currentValue === parseInt(pos) + 1){
            return; // Si la condición se cumple, se detiene la ejecución aquí
        }
        document.querySelectorAll('.item').forEach((it) =>{
            //classList.contains:  comprobar si un elemento tiene una clase específica.
            if(it.classList.contains('item-full')){
                it.classList.remove("item-full")//remueve la clase para q cuando pase el mouse no se queden todas las estrellas llenitas
            }
        });

        // Añadimos la clase 'item-full' hasta la estrella en la posición 'pos' para resaltarlas
        for(let i = 0; i <= pos; i++){        //     item-posición i
            const square = document.querySelector(`.item-${i}`);
            if(!square.classList.contains("item-full")){ //Comprobar si la estrella ya está resaltada
                square.classList.add("item-full");
            }
        }
        currentValue = parseInt(pos) + 1;//Actualizar el valor de la calificación
    });

    item.addEventListener('click', (e) =>{
        const pos = item.getAttribute('data-pos'); //Captura posición del div
        currentValue = parseInt(pos) +1; //actualiza el Valor Actual de las estrellitas
        console.log(currentValue);
    })
});