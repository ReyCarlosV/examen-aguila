# 🦅 Canvas Eagle Recreator (Águila Geométrica)

Este proyecto es una aplicación web interactiva desarrollada para la asignatura de **Graficacion**. Su objetivo principal es la recreación programática de una imagen vectorial compleja (un águila geométrica estilo Club América) utilizando exclusivamente la API de Canvas de HTML5 y JavaScript.

## 🚀 Características Principales

* **Dibujo Algorítmico Avanzado**: Recreación de la imagen utilizando más de 70 figuras geométricas básicas y complejas (polígonos, elipses, arcos, curvas bezier).
* **Matrices Matemáticas**: Las alas del águila se generan mediante un bucle de paralelogramos vectoriales para lograr un patrón de mosaico sin huecos.
* **Sistema de Capas**: El dibujo se estructura ordenadamente de fondo a frente (Cielo -> Nubes -> Cola -> Alas -> Cuerpo -> Cabeza).
* **Diseño UI/UX Moderno**: Interfaz construida con **Bootstrap 5**, implementando un diseño responsivo (adaptable a móviles) y un elegante Modo Oscuro (*Dark Mode*) con efectos de cristal esmerilado (*Glassmorphism*).

## 🛠️ Tecnologías Utilizadas

* **HTML5**: Estructura semántica y elemento `<canvas>`.
* **CSS3**: Estilos personalizados, gradientes y animaciones suaves.
* **JavaScript (Vanilla JS)**: Lógica de renderizado gráfico usando `CanvasRenderingContext2D`.
* **Bootstrap 5.3**: Sistema de cuadrículas (Grid) y componentes de interfaz.
* **Google Fonts & Bootstrap Icons**: Tipografía 'Poppins' e iconografía vectorial.

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura limpia de separación de recursos:

```text
📁 examen-aguila/
│
├── 📄 index.html          # Estructura principal de la aplicación y UI
├── 📄 README.md           # Documentación del proyecto 
│
└── 📁 assets/             # Recursos estáticos
    ├── 📁 css/
    │   └── 📄 styles.css  # Estilos personalizados y tema oscuro
    ├── 📁 img/
    │   ├── 🖼️ image_4.png # Imagen original de referencia
    │   └── 🖼️ favicon.png # Ícono de la pestaña del navegador
    └── 📁 js/
        └── 📄 main.js     # Lógica matemática y dibujo en Canvas