/**
 * ==============================================================================
 * APLICACIÓN: Geometric Bird Recreator (Canvas API)
 * DESCRIPCIÓN: Esta aplicación recrea programáticamente la imagen de un pájaro
 * geométrico estilizado (image_4.png) utilizando la API Canvas de HTML5.
 * Toda la composición está basada en formas básicas (rectángulos,
 * círculos, elipses y caminos de polígonos complejos).
 * CURSO: Computación Gráfica Web
 * PROGRAMADOR: [Tu Nombre Aquí]
 * FECHA: Mayo 2023
 * ==============================================================================
 */

// Esperar a que el DOM esté completamente cargado antes de ejecutar el dibujo
document.addEventListener("DOMContentLoaded", function() {
    initDraw();
});

/**
 * Función principal de inicialización y control de dibujo.
 */
function initDraw() {
    // 1. Obtener referencia al lienzo y al contexto 2D
    const canvas = document.getElementById('birdCanvas');
    if (!canvas || !canvas.getContext) {
        console.error("No se pudo inicializar el Canvas API.");
        return;
    }
    const ctx = canvas.getContext('2d');

    // 2. Definir los colores exactos de la imagen original (Palette)
    const colors = {
        skyBlue: "#3282C9",       // Fondo cielo
        grassGreen: "#4CA54C",    // Suelo
        cloudWhite: "#AED9EA",    // Nubes
        deepGold: "#BF9A1E",      // Cuerpo principal, cabeza, pico, alas oscuras
        lightGold: "#F7EA9B",     // Alas claras, patas
        darkBlueWing: "#13316E", // Mosaico alas oscuras
        lightBlueWing: "#91D6EB"  // Mosaico alas claras
    };

    // --- Iniciar la secuencia de dibujo organizada por figuras ---

    // A. Dibujar el Fondo (Figuras Rectangulares)
    drawBackground(ctx, canvas, colors);

    // B. Dibujar las Nubes (Caminos Complejos)
    drawClouds(ctx, colors);

    // C. Dibujar el Cuerpo Principal (Elipse)
    drawBody(ctx, colors);

    // D. Dibujar la Cola (Rectángulos)
    drawTail(ctx, colors);

    // E. Dibujar las Alas (Mosaico de Polígonos Complejos de 4 Colores)
    //    Esta sección es la más compleja y recrea el patrón geométrico.
    drawWings(ctx, colors);

    // F. Dibujar la Cabeza, Ojo y Pico (Círculos, Ojos, Polígono)
    drawHead(ctx, colors);

    // G. Dibujar las Patas (Elipses pequeñas)
    drawFeet(ctx, colors);
}

/**
 * Figuras Básicas: Rectángulos.
 * Dibuja el cielo y el suelo.
 */
function drawBackground(ctx, canvas, colors) {
    // Dibujar el Cielo
    ctx.fillStyle = colors.skyBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar el Suelo (franja inferior verde)
    // Alto del suelo aproximado: 1/8 de la altura del lienzo
    const groundHeight = canvas.height * 0.125;
    ctx.fillStyle = colors.grassGreen;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

/**
 * Figuras Básicas: Caminos Complejos (Curvas).
 * Dibuja las 3 nubes estilizadas.
 */
function drawClouds(ctx, colors) {
    ctx.fillStyle = colors.cloudWhite;
    ctx.beginPath();

    // Nube 1 (Izquierda Superior)
    // Aproximación de forma de nube estilizada
    ctx.moveTo(100, 150);
    ctx.bezierCurveTo(100, 100, 200, 100, 250, 140);
    ctx.bezierCurveTo(300, 100, 400, 100, 400, 150);
    ctx.bezierCurveTo(450, 150, 450, 250, 400, 250);
    ctx.bezierCurveTo(400, 300, 100, 300, 100, 250);
    ctx.closePath();
    ctx.fill();

    // Nube 2 (Centro Derecha, detrás del ala)
    ctx.beginPath();
    ctx.moveTo(800, 200);
    ctx.bezierCurveTo(800, 150, 900, 150, 950, 190);
    ctx.bezierCurveTo(1000, 150, 1100, 150, 1100, 200);
    ctx.bezierCurveTo(1150, 200, 1150, 300, 1100, 300);
    ctx.bezierCurveTo(1100, 350, 800, 350, 800, 300);
    ctx.closePath();
    ctx.fill();

    // Nube 3 (Derecha Inferior, baja)
    ctx.beginPath();
    ctx.moveTo(650, 600);
    ctx.bezierCurveTo(650, 560, 720, 560, 750, 590);
    ctx.bezierCurveTo(790, 560, 860, 560, 860, 600);
    ctx.bezierCurveTo(890, 600, 890, 670, 860, 670);
    ctx.bezierCurveTo(860, 700, 650, 700, 650, 670);
    ctx.closePath();
    ctx.fill();
}

/**
 * Figura Básica: Elipse.
 * Dibuja el cuerpo ovalado central.
 */
function drawBody(ctx, colors) {
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    // Centro del cuerpo: approx (400, 450) en un lienzo de 1280x720
    // Radio X (ancho), Radio Y (alto)
    ctx.ellipse(420, 480, 180, 120, Math.PI / 16, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * Figura Básica: Rectángulos.
 * Dibuja los cuatro bloques de la cola.
 */
function drawTail(ctx, colors) {
    ctx.fillStyle = colors.lightGold;

    const tailX = 250;
    const tailY = 560;
    const width = 120;
    const height = 40;
    const spacing = 10;
    const angle = -Math.PI / 6; // Angulo de inclinación de la cola

    for (let i = 0; i < 4; i++) {
        ctx.save(); // Guardar estado para rotar cada pluma
        ctx.translate(tailX, tailY + (i * (height + spacing)));
        ctx.rotate(angle);
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
}

/**
 * Sección Compleja: Mosaico de Polígonos.
 * Recrea el patrón geométrico de las alas.
 * He dividido esto en 4 sub-patrones basados en color.
 */
function drawWings(ctx, colors) {
    // Definición de las "filas" geométricas del mosaico de alas.
    // Esto es un mapeo manual de las formas geométricas de la imagen 4.png.
    // X, Y son relativos a un punto de inicio de la columna de plumas.

    const drawMosaicPath = (points, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    };

    // --- Ala Izquierda ---
    const leftWingStart = { x: 300, y: 380 };

    // Fila 1: Deep Gold (Cuerpo a Ala)
    drawMosaicPath([[leftWingStart.x, leftWingStart.y], [200, 200], [50, 150], [50, 200], [200, 250]], colors.deepGold);
    drawMosaicPath([[200, 200], [300, 150], [250, 200], [150, 250]], colors.deepGold);

    // Mosaico Patrón (Simulación de los 4 colores)
    // El patrón exacto de más de 30 polígonos requiere un mapeo de puntos coordinado.
    // Usaré aproximaciones geométricas de las formas principales.

    // Capa de Plumas Clara (Deep Gold en los bordes)
    ctx.fillStyle = colors.deepGold;
    // Puntos para la forma principal del ala izquierda
    ctx.beginPath();
    ctx.moveTo(350, 380); // Cerca del cuerpo
    ctx.lineTo(250, 150); // Punta superior
    ctx.lineTo(50, 150);  // Borde exterior
    ctx.lineTo(150, 250); // Borde inferior
    ctx.lineTo(350, 380);
    ctx.closePath();
    ctx.fill();

    // Relleno del mosaico geométrico izquierdo
    // El patrón se repite: Dark Blue -> Light Gold -> Light Blue -> Deep Gold
    for(let i=0; i<4; i++) {
        const offset = i * 40;
        // Dark Blue trapezoid
        drawMosaicPath([[100+offset, 160], [140+offset, 160], [190+offset, 210], [150+offset, 210]], colors.darkBlueWing);
        // Light Gold trapezoid
        drawMosaicPath([[140+offset, 160], [180+offset, 160], [230+offset, 210], [190+offset, 210]], colors.lightGold);
        // Light Blue trapezoid
        drawMosaicPath([[180+offset, 160], [220+offset, 160], [270+offset, 210], [230+offset, 210]], colors.lightBlueWing);
        // Deep Gold trapezoid
        drawMosaicPath([[220+offset, 160], [260+offset, 160], [310+offset, 210], [270+offset, 210]], colors.deepGold);
    }

    // --- Ala Derecha (Simétrica) ---
    const rightWingStart = { x: 550, y: 400 };

    // Capa de plumas Clara (Deep Gold en los bordes)
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.moveTo(520, 390); // Cerca del cuerpo
    ctx.lineTo(620, 150); // Punta superior
    ctx.lineTo(820, 150);  // Borde exterior
    ctx.lineTo(720, 250); // Borde inferior
    ctx.lineTo(520, 390);
    ctx.closePath();
    ctx.fill();

    // Relleno del mosaico geométrico derecho
    // Invertido simétricamente
    for(let i=0; i<4; i++) {
        const offset = i * 40;
        // Dark Blue trapezoid
        drawMosaicPath([[780-offset, 160], [740-offset, 160], [690-offset, 210], [730-offset, 210]], colors.darkBlueWing);
        // Light Gold trapezoid
        drawMosaicPath([[740-offset, 160], [700-offset, 160], [650-offset, 210], [690-offset, 210]], colors.lightGold);
        // Light Blue trapezoid
        drawMosaicPath([[700-offset, 160], [660-offset, 160], [610-offset, 210], [650-offset, 210]], colors.lightBlueWing);
        // Deep Gold trapezoid
        drawMosaicPath([[660-offset, 160], [620-offset, 160], [570-offset, 210], [610-offset, 210]], colors.deepGold);
    }
}

/**
 * Figura Básica: Círculos y Caminos.
 * Dibuja la cabeza, el ojo complejo y el pico.
 */
function drawHead(ctx, colors) {
    // 1. Cabeza (Círculo)
    const headCenterX = 600;
    const headCenterY = 400;
    const headRadius = 70;

    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.arc(headCenterX, headCenterY, headRadius, 0, 2 * Math.PI);
    ctx.fill();

    // 2. Ojo (Múltiples Círculos y Ovoides)
    const eyeCenterX = 620;
    const eyeCenterY = 380;

    // Anillo Exterior Oscuro (Dark Blue Wing)
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath();
    ctx.arc(eyeCenterX, eyeCenterY, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Anillo Medio Claro (Light Blue Wing)
    ctx.fillStyle = colors.lightBlueWing;
    ctx.beginPath();
    ctx.arc(eyeCenterX, eyeCenterY, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Pupila Ovalada Oscura
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath();
    // Centro, Radio X, Radio Y, Rotación
    ctx.ellipse(eyeCenterX + 2, eyeCenterY, 5, 8, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 3. Pico (Polígono de Caminos)
    ctx.fillStyle = colors.lightGold;
    ctx.beginPath();
    // Punto donde se une a la cabeza
    ctx.moveTo(660, 410);
    // Punta del pico
    ctx.lineTo(700, 420);
    // Borde inferior donde se une a la cabeza
    ctx.lineTo(660, 440);
    // Pequeño borde interno
    ctx.lineTo(650, 425);
    ctx.closePath();
    ctx.fill();
}

/**
 * Figura Básica: Elipses pequeñas.
 * Dibuja las dos patas amarillas.
 */
function drawFeet(ctx, colors) {
    ctx.fillStyle = colors.lightGold;

    // Pata 1 (Izquierda)
    ctx.beginPath();
    // Centro X, Centro Y, Radio X, Radio Y, Rotación
    ctx.ellipse(450, 580, 20, 30, Math.PI / 8, 0, 2 * Math.PI);
    ctx.fill();

    // Pata 2 (Derecha, superpuesta)
    ctx.beginPath();
    ctx.ellipse(480, 570, 20, 30, Math.PI / 8, 0, 2 * Math.PI);
    ctx.fill();
}