// Carrito 


// este objeto almacena los productos disponibles en inventario 
// y tiene metodos para interactuar con ellos
const db = {
    // este es un objeto el cual contiene metodos para interactuar con los productos "db.items"
    methods : {
        // este es un metodo el cual busca un producto en la base de datos por su id "db.items"
        find: (id) => {
            // .find recorre todo el arreglo items hasta que encuentra uno que cumpla la condicion 
            // y devuelve ese que cumpla con la condicion
            return db.items.find(item => item.id == id);
        },

        // este es un metodo para reducir la cantidad del inventario del productor comprado
        remove: (items) => {
            // el forEach recorre todo el arreglo items
            items.forEach(item =>{
                // primero se busca el producto en la base de datos
                const product = db.methods.find(item.id)
                // si lo encuentra se toma el producto y se le resta la cantidad a comprar
                product.qty = product.qty - item.qty;

                console.log(db);
            })
        },
    },
    
    // este es un array que contiene los productos disponibles guardando su id, img, titulo, 
    // precio y cantidad disponible 
    items : [
        {
            id: 1,
            img: 'img/decoracion8.jpg',
            title: 'Tacita Navideña',
            precio: 139991,
            qty: 7,
        },
        {
            id: 2,
            img: 'img/regalo12.jpg',
            title: 'capa navideña',
            precio: 70991,
            qty: 30,
 
        },
        {
            id: 3,
            img: 'img/ropa14.jpg',
            title: 'Guantes y Gorro Navideño',
            precio: 240000,
            qty: 20,
 
        },
        {
            id: 4,
            img: 'img/comida7.jpg',
            title: 'Galletas navideñas',
            precio: 49991,
            qty: 10,
 
        },
        
    ]
};

const carrito = {
    // esto permite guardar datos en forma de texto en el alacenamiento local del navegador 
    // de forma local "localStorage", a la cual solo se puede acceder mediante la llave "carrito", 
    // lo que hace esta linea de codigo es que si existe algo guardado bajo la llave "carrito" 
    // lo combierte a objeto mediante el JSON.parse si no existe, se inicializa como un array vacio
    items: JSON.parse(localStorage.getItem('carrito')) || [],
    methods: {
        //metodo para agregar al carrito
        add: (id, qty) => {
            // busca si el producto ya esta en el carrito mediante el metodo get()
            const cartItem = carrito.methods.get(id);

            //comprueba si existe dentro del carrito o en el array
            if(cartItem){
                // comprueba si hay suficiente cantidad en el inventario mediante el metodo
                // .hasInventory para poder agregarla
                if(carrito.methods.hasInventory(id, qty + cartItem.qty)){
                    cartItem.qty += qty;
                }else{
                    alert('no hay suficiente inventario')
                }
            }else{
                // si no se encuentra en el carrito se agrega con el .push
                carrito.items.push({id, qty}); 
            }
            // se llama el metodo .save() para guardar el carrito actualizado en localStore
            carrito.methods.save()
        },

        remove: (id, qty) => {
            // busca el producto dentro del carrito mediante el metodo get()
            const cartItem = carrito.methods.get(id);

            // se comprueba si la cantidad restante luego de restarle es mayor a 0
            // si sí es asi se le reduce esa cantidad al producto en el carrito
            // si no se el .filter crea un nuevo array o una nueva version sin el id de ese 
            // producto quedando "eliminado" 
            if(cartItem.qty - qty > 0){
                cartItem.qty -= qty;
            }else{
                carrito.items = carrito.items.filter(item => item.id != id)
                
            };
            // se llama el metodo .save() para guardar el carrito actualizado en localStore
            carrito.methods.save();
        },
        // este metodo es para contar el numero total de productos en el carrito
        // rrecorre el array carrito.items y suma cada cantidad de cada producto
        // al acc inicializado en 0
        count: () => {
            return carrito.items.reduce((acc, item) => acc + item.qty, 0);
        },
        // este metodo busca en el carrito un producto mediante un indice con el id especificado 
        // luego valida si es mayor o igual a 0 es porq si existe si no devuelve null 
        get: (id) => { 
            const index = carrito.items.findIndex(item => item.id == id);
            return index >= 0 ? carrito.items[index] : null;
        },
        //este metodo es para calcular el valor total de todos los productos 
        // primero se recorre el array con .reduce luego se busca el producto dentro de la db 
        // y se toma su precio para multiplicarla con la cantidad agregada en el carrito 
        // y acumullando eso en el acc devolviendo el total
        getTotal: () => {
            let total = carrito.items.reduce((acc, item)=>{
                const found = db.methods.find(item.id);
                return (acc + found.precio * item.qty);
            }, 0);
            return total;
        },
        // este metodo verifica si hay suficiente inventario buscando primero el producto 
        // en la base de datos y restandile la cantidad solicitada devolviendo true si el resultado 
        // es mayor o igual a 0 y false si no
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id == id).qty - qty >= 0;
        },
        //este metodo es para finalizar la compra llamado primero el metodo .remove para descontar 
        // las cantidades compradas del inventario luego se vacia el carrito asignandole un 
        // array vacio 
        purchase: () => {
            db.methods.remove(carrito.items);
            carrito.items = [];
            carrito.methods.save();
        },
        //Se convierte carrito.items a cadena JSON y se guarda bajo la clave 'carrito'.
        save: () => {
            localStorage.setItem('carrito', JSON.stringify(carrito.items));  // Guardar en localStorage
        }
    }
};

// ejecuta la funcion render carrito una vez que el documento HTML a sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
});


// se selleccionan todos los botones que esten dentro de un contenedor q tenga 
// la clase item2 a los cuales se les agrega un evento 
document.querySelectorAll('.item2 button').forEach(button =>{
    button.addEventListener('click', e =>{
        // se obtiene el id del contenedor mas cercano leyendo el
        // atributo data-id usando el closest y con la clase item2 en el que esta metido el boton
        const id = parseInt(button.closest('.item2').getAttribute('data-id'));
        // se busca el producto en la base de datos con el id obtenido
        const item = db.methods.find(id);

        // se verifica que el producto exista y que al restarle uno la cantidad sea mayor a 0
        if(item && item.qty -1 > 0){
            //añadir al carrito
            carrito.methods.add(id, 1);
            renderCarrito();
        }else{
            console.log('ya no hay inventario')
        };
    });
});

function renderCarrito(){
    const tabla = document.getElementById('productosCarrito');
    tabla.innerHTML = ''

    carrito.items.forEach(item =>{
        //por cada item en el carrito se busca el producto completo en la base de datos
        const dbItem = db.methods.find(item.id);


        //se crean elementos HTML para mostrar el contenido en si 
        const fila = document.createElement('tr');

       const columnaImg = document.createElement('td');
       const img = document.createElement('img');

       img.src = dbItem.img;
       img.width = 50;

       columnaImg.appendChild(img);

       const fila2 = document.createElement('tr');
       const columnaTitu = document.createElement('td');
       columnaTitu.textContent = dbItem.title;

       const fila3 = document.createElement('tr');
       const colCantidad = document.createElement('td');
       colCantidad.textContent = ('Cantidad: ') + item.qty;

       const fila4 = document.createElement('tr');
       const colSubto = document.createElement('td');
       colSubto.textContent = ('Subtotal: ') + item.qty * dbItem.precio;

       const fila5 = document.createElement('tr');
       const colMenos_mas= document.createElement('td');
       const buttonMenos = document.createElement('button');
       const buttonMas = document.createElement('button');
       buttonMenos.textContent = '-' ;
       buttonMenos.dataset.id = item.id;
       buttonMenos.classList.add('disminuir')
       buttonMas.textContent = '+' ;
       buttonMas.dataset.id = item.id;
       buttonMas.classList.add('agregar')

       fila.appendChild(columnaImg);
       fila2.appendChild(columnaTitu);
       fila3.appendChild(colCantidad);
       fila4.appendChild(colSubto);
       colMenos_mas.appendChild(buttonMenos);
       colMenos_mas.appendChild(buttonMas);
       fila5.appendChild(colMenos_mas);
      
       tabla.appendChild(fila);
       tabla.appendChild(fila2);
       tabla.appendChild(fila3);
       tabla.appendChild(fila4);
       tabla.appendChild(fila5);
       
       
       
    });
    const filaTotal = document.createElement('tr');
    const colTotal = document.createElement('td');
    let total = carrito.methods.getTotal();
    colTotal.textContent =('total : ') + total;
    colTotal.classList.add('total');

    filaTotal.appendChild(colTotal);

    const filaButtons= document.createElement('tr');
    const colCerrarComprar= document.createElement('td');
       
    const buttonCerrar = document.createElement('button');
    const buttonComprar = document.createElement('button');

    buttonCerrar.textContent = 'Cerrar' ;
    buttonCerrar.classList.add('bClose');
    buttonComprar.textContent = 'Comprar';
    buttonComprar.classList.add('bComprar');

    // si no hay productos en el carrito desactivamos el boton de comprar
    if(carrito.items.length<1){
        buttonComprar.classList.add('desa3');
    };

    colCerrarComprar.appendChild(buttonCerrar);
    colCerrarComprar.appendChild(buttonComprar);
    filaButtons.appendChild(colCerrarComprar);
    tabla.appendChild(filaButtons);
    tabla.appendChild(filaTotal);

    // se seleccionan todos los botones con la clase agregar
    document.querySelectorAll('.agregar').forEach(button =>{
        button.addEventListener('click', e =>{
            // se toma el valor de su id mediante el data-id
            const id = parseInt(button.getAttribute('data-id'));
            // se llama el metodo add para aumentar la cantidad en 1 
            carrito.methods.add(id,1);
            renderCarrito();
        });
    });
    // se seleccionan todos los botones con la clase agregar
    document.querySelectorAll('.disminuir').forEach(button =>{
        button.addEventListener('click', e=>{
            // se toma el valor de su id mediante el data-id
            const id = parseInt(button.getAttribute('data-id'));
            // se llama el metodo remove para disminuir la cantidad en 1 
            carrito.methods.remove(id, 1);
            renderCarrito();
        });
    });

    
    const carrritoCompra = document.getElementById('carrritoCompra');
    document.querySelector('.bClose').addEventListener('click', e =>{
        carrritoCompra.classList.remove('mostrar');
        carrritoCompra.classList.add('desa3');
    });
    
    // se llama y se compueba de que el boton comprar exista y se le agrega 
    // un evento para llamar el mtodo purchase el cual descuenta el inventario y limpia el carrito
    const bComprar = document.querySelector('.bComprar');
    if(bComprar){
        bComprar.addEventListener('click', (e) =>{
            carrito.methods.purchase();
            renderCarrito();
            
        })
    }
};

const iconoCarrito = document.getElementById('iconoCarrito');
iconoCarrito.addEventListener('click', ()=>{
    carrritoCompra.classList.remove('desa3');
    carrritoCompra.classList.add('mostrar');

})


