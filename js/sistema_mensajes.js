const comments = []; // Arreglo que almacena los comentarios principales. Cada comentario puede tener respuestas dentro de un arreglo 'responses'.
//Crear Elementos
const inputContainer = document.createElement('div');
const input = document.createElement ('input'); // Creamos el campo de entrada para escribir comentarios, lo clonaremos más adelante para respuestas
const commentsContainer = document.querySelector("#comments-container") //capturar elemento

input.classList.add('input')//adicionar clase

//Keydown es un tipo de evento que se dispara con cualquier tecla, si quieres ver que presionaron para entrar
//a esa función tendrias que utilizar "event.key" lo mismo para especificar que quieres q pase cuando le den click a esta (Example: event.key === "Enter") 
input.addEventListener('keydown', (evento)=>{
    //cuando inicie el sistema este es igual a null por lo q no hay un comentario ya hecho
    handleEnter(evento, null);
    //console.log(event.key)
});

// current hace referencia al comentario actual al que estoy haciendo una replica,cuando inicie el sistema
// este sera igual a null por lo q no hay un comentario ya hecho
function handleEnter(evento, current){
    if(evento.key == "Enter" && evento.target.value !== ''){
        const newComment={
            text: evento.target.value,
            likes: 0,
            responses: [] // Cuando quiera responder a un comentario o hacer una réplica, se guardará en este arreglo
        }
        if(current===null){
            comments.unshift(newComment); //Si current es null, significa que estamos agregando un comentario principal, por lo que lo agregamos al principio del array comments utilizando unshift()
            //console.log(comments) 
        }else{
            current.responses.unshift(newComment); // Si current no es null, estamos respondiendo a un comentario existente
            //console.log(current.responses)
        }
        evento.target.value = ""; 
        commentsContainer.innerHTML =""; 
        commentsContainer.appendChild(inputContainer); // Reagrega el contenedor de entrada para seguir escribiendo.
        renderComments(comments, commentsContainer);  // Llama a la función para renderizar los comentarios en pantalla.
    }
}

function renderComments(arreglo, parentComments){
    arreglo.forEach(element => {

        // Creamos los contenedores para el comentario y sus respuestas
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const responsesContainer = document.createElement('div'); 
        responsesContainer.classList.add('resposes-container');

        // Creamos los botones de m egusta y responder
        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');
        
        const textContainer = document.createElement('div'); 
        textContainer.textContent = element.text;

        const actionsContainer = document.createElement('div')
        replyButton.textContent = 'Responder'; 
        likeButton.textContent = `${element.likes > 0? `${element.likes} likes`: 'like'}`;

        replyButton.addEventListener('click', evento =>{
            //CloneNode me va a decir q si lo voy a clonar de forma completa, es decir con todo y sus hijos por eso en el parentesis va "true"
            const newInput = inputContainer.cloneNode(true)
            newInput.value = ''; //lo colocamos en vacio por si el input inicial esta lleno, recuerda q estamos copiando todo
            newInput.focus(); 
            newInput.addEventListener('keydown', evento => {
                handleEnter(evento, element);  // Responder al comentario actual
            });
            commentContainer.insertBefore(newInput, responsesContainer)  // Insertamos el nuevo input antes de las respuestas
        });

        likeButton.addEventListener('click', evento =>{
            element.likes++; // Incrementamos el contador de likes
            likeButton.textContent = `${element.likes > 0? `${element.likes} likes`: 'like'}`;
        });

        //append (Para poder crear toda la estructura del DOM)
        commentContainer.appendChild(textContainer); 
        commentContainer.appendChild(actionsContainer); 
        actionsContainer.appendChild(replyButton);
        actionsContainer.appendChild(likeButton);

        commentContainer.appendChild(responsesContainer);

        if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer);   
        }
        parentComments.appendChild(commentContainer); 
    });
    console.log(comments);
}
commentsContainer.appendChild(inputContainer); 
inputContainer.appendChild(input);