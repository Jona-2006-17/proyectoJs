const ContainerCopos = document.querySelector(".Nievee");
function createSnowflake() {
/*Normalmente cuando capturamos un elemento del HTML utilizamos createElement, en este caso utilizamos 
createElementnS pero es porque el elemento SVG que utilizamos no es propio, nativo del HTML sino que es 
externo y al ser externo se necesita especificar el namespace(URL)(ojo, pero solo en js) para que el 
navegador pueda interpretar y renderizar correctamente el elemento (RENDERIZAR: navegador o programa 
convierte un codigo o una descripción de una imagen o documento en una representación visual que se puede ver
en panatlla)

En Js es necesario especificar el namespace para que el Js pueda entender y manipular correctamente el elemento*/
    const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //Establece atributos que tiene en HTML para cada copo de nieve
    snowflake.setAttribute("class", "snowflake"); //Clase de SVG
    snowflake.setAttribute("viewBox", "0 0 24 24"); //Establece el atributo iewBox del elemento SVG que define el tamaño y la posición del copo de nieve

    // Posición y animación aleatorias
    // Math.random() Es una función de Js que se utiliza para generar números aleatorios en un rango especifico en el caso de la posición horizontal su rango esta entre 100 y se le agrega el vw para obtener un valor de posición horizontal en porcentaje de la anchura de la ventana

    /*snowflake.style.left Establece la posición horizontal del copito de nieve de manera aleatoria, 
    entre 0 y 100% del ancho de la ventana "Left" establece la posición horizontal del copito de nieve
    mientras que "vw" se refiere a la unidad de medida que representa un porcentake de la anchura de la ventana
    
    Math.random() * 100 + "vw" = Se obtiene un valor aleatorio entre 0 y 100% de la anchura de la ventana, la unidad "vw" se refiere a la anchura de la ventana del navegador. Por ejemplo, SI LA VENTANA TIENE UNA ANCHURA DE 1000 PIXELES, entonces 50vm sería igual a 500px */
    snowflake.style.left = Math.random() * 100 + "vw"; //Decir en que posición se va a crear el copo de nieve
    //snowflake.style.animationDuration Establece la duración de la animación (En este caso velocidad) del copito de nieve de manera aleatoria, entre 5 y 10 segundos para que cada copo de nieve caiga a diferente velocidad
    snowflake.style.animationDuration = Math.random() * 5 + 5 + "s";  
    //Especifica el tiempo de retraso antes de que comience la animación 
    snowflake.animationDelay = Math.random() * 5 + "s"; //Agregamos un Delay a la animación para que cada copo caiga de manera aleatoria

    // SVG del copo de nieve, diseño del SVG
    snowflake.innerHTML = `
        <path fill="white" d="M12 2L13 8H17L14 10L15 16L12 14L9 16L10 10L7 8H11L12 2Z"/>
    `;

    ContainerCopos.appendChild(snowflake);

    
    //Crear un "Escuchar evento" que cada que termine la animación quite y aggregue un copo de nieve
    snowflake.addEventListener("animationend", () => {
        snowflake.remove(); // Eliminar después de que termine la animación
        createSnowflake(); // Crear un nuevo copo por medio del ciclo for (Llamar funcipon)
    });
}

const TOTAL_SNOWFLAKES = 35;
// Crear copos de nieve
for (let i = 0; i < TOTAL_SNOWFLAKES; i++) {
    setTimeout(createSnowflake, i * 200);
               //Llamamaos función 
}