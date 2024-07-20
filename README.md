## 👋 hello

## Este proyecto consiste en la creación de una web de mini-juegos.

- Portada con catálogo.

- Mini-juego con opción de vuelta al menú.

## opción de crear un contenedor.

- Creación del contenedor

    ```bash
    docker build -t mini-juegos-web .

    ```

- Correr e contenedor

    ```bash
    docker run -d -p 8080:80 mini-juegos-web

    ```

## Estructura del proyecto:

/juegos
  ├── index.html        # Página principal del catálogo
  ├── styles.css        # Estilos para la página principal
  ├── script.js         # Scripts para la página principal
  ├── juego1
  │   ├── index.html    # Página de juego 1
  │   ├── styles.css    # Estilos para el juego 1
  │   └── script.js     # Script para el juego 1
  ├── juego2
  │   ├── index.html    # Página de juego 2
  │   ├── styles.css    # Estilos para el juego 2
  │   └── script.js     # Script para el juego 2
  └── ...