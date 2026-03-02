/**
 * ==============================================================================
 * APLICACIÓN: Recreación Geométrica de Águila V2 (Corregida)
 * DESCRIPCIÓN: Generación de mosaico geométrico avanzado (+30 figuras) usando
 * matrices matemáticas y transformaciones de espejo en HTML5 Canvas.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", function() {
    initDraw();
});

function initDraw() {
    const canvas = document.getElementById('birdCanvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    const colors = {
        skyBlue: "#3282C9",       
        grassGreen: "#4CA54C",    
        cloudWhite: "#AED9EA",    
        deepGold: "#BF9A1E",      
        lightGold: "#F7EA9B",     
        darkBlueWing: "#13316E",  
        lightBlueWing: "#91D6EB"  
    };

    // 1. Dibujar Fondos
    drawBackground(ctx, canvas, colors);
    drawClouds(ctx, colors);

    // 2. Mover el "Punto Cero" (0,0) al centro exacto del lienzo
    // Esto hace que dibujar al pájaro sea infinitamente más fácil
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 50);

    // 3. Dibujar las partes del pájaro desde el centro hacia afuera
    drawTail(ctx, colors);
    
    // Dibujar Ala Izquierda
    ctx.save();
    ctx.translate(-50, -50); // Mover al hombro izquierdo
    drawGeometricWing(ctx, colors);
    ctx.restore();

    // Dibujar Ala Derecha (usando efecto espejo horizontal)
    ctx.save();
    ctx.translate(50, -50);  // Mover al hombro derecho
    ctx.scale(-1, 1);        // ¡MAGIA! Voltea todo el canvas horizontalmente
    drawGeometricWing(ctx, colors);
    ctx.restore();

    // Dibujar Cuerpo y Cabeza encima de las alas
    drawBody(ctx, colors);
    drawFeet(ctx, colors);
    drawHead(ctx, colors);

    // Restaurar el canvas a la normalidad
    ctx.restore();
}

/** * FONDO Y NUBES 
 */
function drawBackground(ctx, canvas, colors) {
    ctx.fillStyle = colors.skyBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const groundHeight = canvas.height * 0.15;
    ctx.fillStyle = colors.grassGreen;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawClouds(ctx, colors) {
    // Función para crear nubes esponjosas usando círculos entrelazados
    const drawFluffyCloud = (x, y) => {
        ctx.fillStyle = colors.cloudWhite;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.arc(x + 40, y - 30, 50, 0, Math.PI * 2);
        ctx.arc(x + 90, y - 10, 45, 0, Math.PI * 2);
        ctx.arc(x + 50, y + 20, 40, 0, Math.PI * 2);
        ctx.fill();
    };

    drawFluffyCloud(150, 200);
    drawFluffyCloud(900, 250);
    drawFluffyCloud(650, 550);
}

/** * ALAS GEOMÉTRICAS (El mosaico complejo)
 * Esta función dibuja el ala izquierda. El sistema la clonará para la derecha.
 */
function drawGeometricWing(ctx, colors) {
    const colorPattern = [colors.darkBlueWing, colors.lightGold, colors.lightBlueWing, colors.deepGold];

    // Base sólida del ala (para que no queden huecos entre los triángulos)
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-400, -250); // Punta superior izquierda
    ctx.lineTo(-250, 150);  // Borde inferior
    ctx.fill();

    // Matriz matemática para generar los triángulos del mosaico
    const rows = 4;
    const trianglesPerRow = 5;

    for (let r = 0; r < rows; r++) {
        // Desplazamiento inicial de cada fila
        let startX = -30 - (r * 70);
        let startY = -40 - (r * 30);

        for (let t = 0; t < trianglesPerRow; t++) {
            ctx.fillStyle = colorPattern[(r + t) % 4];
            ctx.beginPath();

            // Calcular los 3 puntos de cada triángulo
            let v1x = startX - (t * 70);
            let v1y = startY + (t * 50);

            let v2x = v1x - 90;
            let v2y = v1y - 70;

            let v3x = v1x - 10;
            let v3y = v1y + 80;

            // Dibujar la figura
            ctx.moveTo(v1x, v1y);
            ctx.lineTo(v2x, v2y);
            ctx.lineTo(v3x, v3y);
            ctx.closePath();
            ctx.fill();
        }
    }
}

/** * CUERPO, COLA Y PATAS
 */
function drawBody(ctx, colors) {
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    // Centro, RadioX, RadioY, Rotación leve hacia arriba
    ctx.ellipse(0, 0, 160, 110, -Math.PI / 16, 0, Math.PI * 2);
    ctx.fill();
}

function drawTail(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    ctx.save();
    ctx.translate(-140, 70); // Posicionar en la parte trasera inferior
    ctx.rotate(Math.PI * 0.8); // Rotar para que apunte hacia abajo a la izquierda

    const w = 120;
    const h = 30;
    
    // Dibujar 4 bloques superpuestos
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(0, i * 25, w, h);
        // Borde fino para separar los bloques
        ctx.strokeStyle = colors.deepGold;
        ctx.lineWidth = 1;
        ctx.strokeRect(0, i * 25, w, h);
    }
    ctx.restore();
}

function drawFeet(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    
    ctx.beginPath();
    ctx.ellipse(30, 100, 15, 25, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(60, 90, 15, 25, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
}

/** * CABEZA, OJO Y PICO
 */
function drawHead(ctx, colors) {
    ctx.save();
    ctx.translate(140, -60); // Posición de la cabeza respecto al centro

    // Cabeza
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();

    // Ojo (3 capas)
    const eyeX = 20, eyeY = -15;
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 15, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.lightBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 10, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.ellipse(eyeX + 2, eyeY, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

    // Pico Geométrico
    ctx.fillStyle = colors.lightGold;
    ctx.beginPath();
    ctx.moveTo(55, -5);   // Borde frente
    ctx.lineTo(95, 10);   // Punta
    ctx.lineTo(50, 25);   // Borde abajo
    ctx.lineTo(40, 10);   // Corte interno
    ctx.fill();

    ctx.restore();
}