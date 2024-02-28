const images = {
    'chaos': '/vista/imagenes/chaos.png',
    'minecraft': '/vista/imagenes/minecraft.png',
    'pog': '/vista/imagenes/pog.png',
    'rammus': '/vista/imagenes/rammus.png'
};

document.addEventListener('DOMContentLoaded', function(){
    if (document.body.classList.contains('game-page')) {
        // Duplicar las imágenes para tener un par de cada una
        const imagesWithPairs = Object.keys(images).flatMap(key => [key, key]);
        
        // Función para mezclar el array de imágenes de forma aleatoria
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        // Mezclar las imágenes de forma aleatoria
        const shuffledImages = shuffleArray(imagesWithPairs);
        
        const memoryGame = document.getElementsByClassName('cards-container')[0];
        
        // Generar las imágenes y asignarles la clase correspondiente
        shuffledImages.forEach((key, index) => {
            const img = document.createElement('img');
            const div = document.createElement('div');
            img.src = images[key];
            img.classList.add(key);
            img.dataset.index = index; // Guardar el índice de la imagen
            img.className += " hidden";
            img.setAttribute('draggable', 'false');
            img.addEventListener('click', revealImage);
            div.className = "cards-container__card";
            div.appendChild(img);
            memoryGame.appendChild(div);
        });
    }   
});

let firstClickedImage = null;
let secondClickedImage = null;
let imagenesDescubiertas = 0;

// Función para revelar una imagen y compararla con otra
function revealImage(event) {
    const clickedImage = event.target;

    // Si la imagen ya está descubierta, salimos de la función
    if (clickedImage.classList.contains("hidden") === false) {
        return;
    }

    clickedImage.classList.remove("hidden");

    // Si es la primera imagen clickeada, la asignamos a firstClickedImage
    if (firstClickedImage === null) {
        firstClickedImage = clickedImage;
    } else if (secondClickedImage === null) {
        secondClickedImage = clickedImage;

        // Verificamos si firstClickedImage y secondClickedImage son diferentes de null antes de acceder a sus propiedades
        if (firstClickedImage !== null && secondClickedImage !== null) {
            const comparar1 = firstClickedImage.className;
            const comparar2 = secondClickedImage.className;

            console.log(comparar1);
            console.log(comparar2);

            if (comparar1 === comparar2) {
                console.log("Ok");

                firstClickedImage = null;
                secondClickedImage = null;

                imagenesDescubiertas += 1;

                alert("Has descubierto " + imagenesDescubiertas + " imágenes");

            } else {
                console.log("No coinciden");

                alert("Incorrecto");

                // Desactivar temporariamente el clic en las imágenes
                firstClickedImage.removeEventListener("click", revealImage);
                secondClickedImage.removeEventListener("click", revealImage);

                // Ocultamos las imágenes que no coinciden después de un corto período de tiempo
                setTimeout(() => {
                    console.log(firstClickedImage.className);
                    console.log(secondClickedImage.className);
                    firstClickedImage.classList.add("hidden");
                    secondClickedImage.classList.add("hidden");

                    // Reactivar los clics en las imágenes después de ocultarlas
                    firstClickedImage.addEventListener("click", revealImage);
                    secondClickedImage.addEventListener("click", revealImage);

                    firstClickedImage = null;
                    secondClickedImage = null;
                }, 200); // Puedes ajustar este valor según sea necesario
            }
            // Reiniciamos las variables después de compararlas
        }
    }
}

const temporizador = () => {
    let contador = 0;
    let titleContainer = document.getElementsByClassName('title-container')[0];
    let tiempo = document.createElement('p');
    tiempo.className = "title-container__score";
    titleContainer.appendChild(tiempo);

    let intervalID = setInterval(function() {
        tiempo.textContent = contador;
        contador += 1;
        if (imagenesDescubiertas == 4) {
            clearInterval(intervalID); // Detener el intervalo cuando se hayan descubierto todas las imágenes
            const username = prompt("Juego terminado, ingrese Nombre de usuario");
            juegoTerminado(null, contador, username); // Pasar null como el primer parámetro
        }
    }, 1000); // Actualizar el contador cada segundo
}

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la página actual es la página de juego
    if (document.body.classList.contains('game-page')) {
        temporizador(); // Iniciar el temporizador solo en la página de juego
    }
});

const juegoTerminado = (event, tiempo, username) => {
    if (event) {
        // Cancelar la recarga de la página si event está definido
        event.preventDefault();
    }

    // Guardar la puntuación
    guardarPuntuacion(tiempo, username);

    // Redirigir después de un breve retraso
    setTimeout(() => {
        window.location.href = '/vista/index.html';
    }, 1000);
}

// Obtener puntuación del almacenamiento local o crear un objeto vacío si no existe
let puntuacion = JSON.parse(localStorage.getItem('puntuacion')) || {};

// Definición de la función guardarPuntuacion
const guardarPuntuacion = (score, username) =>  {
    // Actualizar el objeto de puntuación
    puntuacion[username] = score;
    // Guardar el objeto de puntuación actualizado en el almacenamiento local
    localStorage.setItem('puntuacion', JSON.stringify(puntuacion));
};

// Definición de la función mostrarPuntuacion
const mostrarPuntuacion = () => {
    // Verificar si la página actual es la página de puntuación
    if (document.body.classList.contains('score-page')) {
        const tableBody = document.querySelector('.table-container__tbody');
        if (tableBody) {
            // Limpiar el contenido existente de la tabla
            tableBody.innerHTML = '';

            // Recorrer el objeto de puntuación para mostrar todas las puntuaciones
            Object.keys(puntuacion).forEach((username, index) => {
                const tr = document.createElement('tr');
                const tdRank = document.createElement('td');
                const tdUsername = document.createElement('td');
                const tdScore = document.createElement('td');
                tdRank.textContent = index + 1; // Mostrar el rango basado en el índice
                tdUsername.textContent = username;
                tdScore.textContent = puntuacion[username];
                tr.className = "table-container__tr"
                tr.appendChild(tdRank);
                tr.appendChild(tdUsername);
                tr.appendChild(tdScore);
                tableBody.appendChild(tr);
            });
        } else {
            console.error('No se encontró el contenedor de la tabla.');
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Llamar a mostrarPuntuacion al cargar la página
    mostrarPuntuacion();
});
