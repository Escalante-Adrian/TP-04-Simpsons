const contenedorPersonajes = document.getElementById("personajes");
const contenedorFrases = document.getElementById("frases");
const botonVerificar = document.getElementById("verificar");
const resultado = document.getElementById("resultado");

let selecciones = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=15")
  .then(res => res.json())
  .then(frasesRecibidas => {
    const personajesUnicos = [];
    const nombresVistos = new Set();

    for (let i = 0; i < frasesRecibidas.length; i++) {
      const personaje = frasesRecibidas[i];
      if (!nombresVistos.has(personaje.character)) {
        nombresVistos.add(personaje.character);
        personajesUnicos.push(personaje);
      }
      if (personajesUnicos.length === 5) break;
    }

    const frasesMezcladas = shuffle([...personajesUnicos]);

    personajesUnicos.forEach(personaje => {
      const div = document.createElement("div");
      div.className = "cuadro";

      const nombre = document.createElement("div");
      nombre.textContent = personaje.character;

      const imagen = document.createElement("img");
      imagen.src = personaje.image;
      imagen.alt = "Foto de " + personaje.character;
      imagen.style.width = "100px";
      imagen.style.height = "100px";
      imagen.style.objectFit = "contain";

      div.appendChild(nombre);
      div.appendChild(imagen);
      div.dataset.nombre = personaje.character;

      div.addEventListener("click", () => {
        if (selecciones.length < 10 && !div.classList.contains("bloqueado")) {
          selecciones.push(personaje.character);
          div.classList.add("seleccionado", "bloqueado");
        }
      });

      contenedorPersonajes.appendChild(div);
    });

    
    frasesMezcladas.forEach(personaje => {
      const div = document.createElement("div");
      div.className = "frase";
      div.textContent = personaje.quote;
      div.dataset.nombre = personaje.character;

      div.addEventListener("click", () => {
        if (selecciones.length < 10 && !div.classList.contains("bloqueado")) {
          selecciones.push(personaje.character);
          div.classList.add("seleccionado", "bloqueado");
        }
      });

      contenedorFrases.appendChild(div);
    });

    botonVerificar.addEventListener("click", () => {
      if (selecciones.length < 10) {
        resultado.textContent = "Seleccione todos los personajes antes de comprobar";
        return;
      }

      let puntos = 0;

      for (let i = 0; i < selecciones.length; i += 2) {
        if (selecciones[i] === selecciones[i + 1]) {
          puntos++;
        }
      }

      if (puntos === 5) {
        resultado.textContent = "Todos son correctos";
      } else {
        resultado.textContent = `Acertaste ${puntos} de 5`;
      }
    });
  });
