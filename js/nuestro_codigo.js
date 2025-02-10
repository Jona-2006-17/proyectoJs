// Carrito 
const db = {
    methods : {
        find: (id) => {
            return db.items.find(item => item.id == id);
        },
        remove: (items) => {
            items.forEach(item =>{
                const product = db.methods.find(item.id)
                product.qty = product.qty - item.qty;

                console.log(db);
            })
        },
    },
    
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
            title: 'comida gato',
            precio: 60,
            qty: 30,
 
        },
        {
            id: 3,
            title: 'comida cerdo',
            precio: 10,
            qty: 20,
 
        },
        {
            id: 4,
            title: 'comida caballo',
            precio: 200,
            qty: 10,
 
        },
        
    ]
};

const carrito = {
    items: JSON.parse(localStorage.getItem('carrito')) || [],
    methods: {
        add: (id, qty) => {
            const cartItem = carrito.methods.get(id);

            if(cartItem){
                if(carrito.methods.hasInventory(id, qty + cartItem.qty)){
                    cartItem.qty += qty;
                }else{
                    alert('no hay suficiente inventario')
                }
            }else{
                carrito.items.push({id, qty});
            }
            carrito.methods.save()
        },
        remove: (id, qty) => {
            const cartItem = carrito.methods.get(id);
            if(cartItem.qty -qty > 0){
                cartItem.qty -= qty;
            }else{
                carrito.items = carrito.items.filter(item => item.id != id)
            };
            carrito.methods.save();
        },
        count: () => {
            return carrito.items.reduce((acc, item) => acc + item.qty, 0);
            carrito.methods.save();
        },
        get: (id) => {
            const index = carrito.items.findIndex(item => item.id == id);
            return index >= 0 ? carrito.items[index] : null;
            carrito.methods.save();
        },
        getTotal: () => {
            let total = carrito.items.reduce((acc, item)=>{
                const found = db.methods.find(item.id);
                return (acc + found.precio * item.qty);
            }, 0);
            return total;
            carrito.methods.save();
        },
        hasInventory: (id, qty) => {
            return db.items.find(item => item.id == id).qty - qty >= 0;
            carrito.methods.save();
        },
        purchase: () => {
            db.methods.remove(carrito.items);
            carrito.items = [];
            carrito.methods.save();
        },
        save: () => {
            localStorage.setItem('carrito', JSON.stringify(carrito.items));  // Guardar en localStorage
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    renderCarrito();
});



document.querySelectorAll('.item2 button').forEach(button =>{
    button.addEventListener('click', e =>{
        const id = parseInt(button.closest('.item2').getAttribute('data-id'));
        const item = db.methods.find(id);

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
        const dbItem = db.methods.find(item.id);

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

    if(carrito.items.length<1){
        buttonComprar.classList.add('desa3');
    };

    colCerrarComprar.appendChild(buttonCerrar);
    colCerrarComprar.appendChild(buttonComprar);
    filaButtons.appendChild(colCerrarComprar);
    tabla.appendChild(filaButtons);
    tabla.appendChild(filaTotal);


    document.querySelectorAll('.agregar').forEach(button =>{
        button.addEventListener('click', e =>{
            const id = parseInt(button.getAttribute('data-id'));
            carrito.methods.add(id,1);
            renderCarrito();
        });
    });

    document.querySelectorAll('.disminuir').forEach(button =>{
        button.addEventListener('click', e=>{
            const id = parseInt(button.getAttribute('data-id'));
            carrito.methods.remove(id, 1);
            renderCarrito();
        });
    });

    
    const carrritoCompra = document.getElementById('carrritoCompra');
    document.querySelector('.bClose').addEventListener('click', e =>{
        carrritoCompra.classList.remove('mostrar');
        carrritoCompra.classList.add('desa3');
    });
    

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


