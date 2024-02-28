const images = {
    'chaos': '/vista/imagenes/chaos.png',
    'minecraft': '/vista/imagenes/minecraft.png',
    'pog': '/vista/imagenes/pog.png',
    'rammus': '/vista/imagenes/rammus.png'
};

document.addEventListener('DOMContentLoaded', function(){
 
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
        img.addEventListener('click', revealImage);
        div.className = "cards-container__card"
        div.appendChild(img);
        memoryGame.appendChild(div);
    });
    

    
});

let firstClickedImage = null;
let secondClickedImage = null;
let respuesta = false;
function revealImage(event) {
    const clickedImage = event.target;
    clickedImage.classList.remove("hidden");

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
            } else {
                console.log("hell naw");
           
                // Ocultamos las imágenes que no coinciden después de un corto período de tiempo
                setTimeout(() => {
                   console.log(firstClickedImage.className)
                   console.log(secondClickedImage.className)
                   firstClickedImage.className += " hidden";
                   secondClickedImage.className += " hidden";

                   firstClickedImage = null;
                   secondClickedImage = null;
                }, 1000); // Puedes ajustar este valor según sea necesario
                
                console.log(respuesta)
            }

            // Reiniciamos las variables después de compararlas

        }
    }
}





