// lista de los objetos que se pueden buscar
const items = ['nomo', 'arbolito', 'juguetes', 'huacales', 'disfrases', 'sueters', 'pastel', 'galletas'];
const buscador = document.getElementById('buscador');
const lista = document.getElementById('lista');

// se le agrega un evento al buscador "input" el cual se ejecuta cuando el usuario escribe y 
// haciendo que detecte cada letra
buscador.addEventListener('input', ()=>{
    const busqueda = buscador.value.toLowerCase();
    lista.innerHTML = '';

    if(busqueda){
        const filtro = items.filter(item => item.toLowerCase().includes(busqueda));
        if(filtro.length>0){
            lista.style.display = "block";
            filtro.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = item;
                a.style.color = "rgb(0, 0, 0)";
                if(item == 'nomo' || item == 'arbolito'){
                    a.href = 'decoraciones.html'
                }
                if(item == 'juguetes' || item == 'huacales'){
                    a.href = 'regalos.html'
                }
                if(item == 'disfrases' || item == 'sueters'){
                    a.href = 'ropa.html'
                }
                if(item == 'pastel' || item == 'galletas'){
                    a.href = 'alimentos.html'
                }
                 
                li.appendChild(a)
                
                lista.appendChild(li)
            });
        }else{
            lista.style.display = "none";
        }
    }else{
        lista.style.display = "none";
    }
} );