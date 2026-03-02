/**
 * ==============================================================================
 * APLICACIÓN: Recreación Geométrica de Águila V3 (Versión Estable y Precisa)
 * DESCRIPCIÓN: Generación de la imagen utilizando polígonos vectoriales en 
 * capas superpuestas para garantizar la estructura del diseño original.
 * Total de figuras: > 30.
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

    // 1. Limpiar el lienzo y dibujar fondos
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas, colors);
    drawClouds(ctx, colors);

    // 2. Mover el Punto Cero (0,0) al centro exacto de la pantalla
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 20);

    // 3. Dibujar la Cola (atrás de todo)
    drawTail(ctx, colors);
    
    // 4. Dibujar Ala Izquierda
    ctx.save();
    ctx.translate(-50, -30); // Posición del hombro izquierdo
    drawGeometricWing(ctx, colors);
    ctx.restore();

    // 5. Dibujar Ala Derecha (usando efecto espejo horizontal)
    ctx.save();
    ctx.translate(50, -30);  // Posición del hombro derecho
    ctx.scale(-1, 1);        // Refleja el eje X
    drawGeometricWing(ctx, colors);
    ctx.restore();

    // 6. Dibujar Cuerpo (encima de la cola y alas)
    drawBody(ctx, colors);
    
    // 7. Dibujar Patas
    drawFeet(ctx, colors);
    
    // 8. Dibujar Cabeza y detalles (hasta el frente)
    drawHead(ctx, colors);

    // Restaurar el lienzo original
    ctx.restore();
}

/** * FONDO Y NUBES (Figuras: 2 Rectángulos, 12 Círculos)
 */
function drawBackground(ctx, canvas, colors) {
    ctx.fillStyle = colors.skyBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const groundHeight = canvas.height * 0.15;
    ctx.fillStyle = colors.grassGreen;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawClouds(ctx, colors) {
    const drawFluffyCloud = (x, y) => {
        ctx.fillStyle = colors.cloudWhite;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.arc(x + 40, y - 30, 50, 0, Math.PI * 2);
        ctx.arc(x + 90, y - 10, 45, 0, Math.PI * 2);
        ctx.arc(x + 50, y + 20, 40, 0, Math.PI * 2);
        ctx.fill();
    };

    drawFluffyCloud(200, 200);
    drawFluffyCloud(850, 180);
    drawFluffyCloud(600, 580);
}

/** * ALAS GEOMÉTRICAS CAPA POR CAPA (Figuras: 4 Polígonos Complejos por ala)
 * Aquí dibujamos la forma exacta con bordes en zig-zag.
 */
function drawGeometricWing(ctx, colors) {
    // Función para dibujar una franja poligonal
    const drawWingLayer = (color, points) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for(let i=1; i<points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        ctx.fill();
    };

    // Capa 1: Fondo Dorado (La más grande)
    drawWingLayer(colors.deepGold, [
        [0, 0],             // Hombro
        [-280, -130],       // Punta superior
        [-320, -60],        // Pico 1
        [-280, -20],        // Valle 1
        [-300, 40],         // Pico 2
        [-220, 60],         // Valle 2
        [-200, 120],        // Pico 3
        [-120, 120]         // Borde inferior
    ]);

    // Capa 2: Azul Claro (Mediana)
    drawWingLayer(colors.lightBlueWing, [
        [0, 15], 
        [-220, -90], 
        [-260, -30], 
        [-220, 0], 
        [-240, 50], 
        [-170, 60], 
        [-150, 100], 
        [-80, 100]
    ]);

    // Capa 3: Amarillo Claro (Pequeña)
    drawWingLayer(colors.lightGold, [
        [0, 30], 
        [-160, -50], 
        [-200, 0], 
        [-160, 20], 
        [-180, 60], 
        [-120, 60], 
        [-100, 80], 
        [-40, 80]
    ]);

    // Capa 4: Azul Oscuro (Interna)
    drawWingLayer(colors.darkBlueWing, [
        [0, 45], 
        [-100, -10], 
        [-140, 30], 
        [-100, 40], 
        [-120, 70], 
        [-70, 60], 
        [-50, 60], 
        [-10, 60]
    ]);
}

/** * CUERPO Y COLA (Figuras: 1 Elipse, 4 Rectángulos)
 */
function drawBody(ctx, colors) {
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    // Centro 0,0 - RadioX 150 - RadioY 100 - Inclinación ligera
    ctx.ellipse(0, 0, 150, 100, -Math.PI / 18, 0, Math.PI * 2);
    ctx.fill();
}

function drawTail(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    ctx.save();
    // Mover a la parte inferior izquierda del cuerpo
    ctx.translate(-110, 50); 
    // Apuntar hacia abajo a la izquierda
    ctx.rotate(Math.PI * 0.8); 

    const w = 110;
    const h = 25;
    
    // 4 plumas rectangulares de la cola
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(0, i * 22, w, h);
        ctx.strokeStyle = colors.deepGold;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, i * 22, w, h);
    }
    ctx.restore();
}

/** * CABEZA Y PATAS (Figuras: 2 Círculos, 3 Elipses, 1 Polígono)
 */
function drawHead(ctx, colors) {
    ctx.save();
    // Posicionar la cabeza arriba a la derecha del centro
    ctx.translate(130, -50); 

    // Cabeza
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();

    // Ojo concéntrico (3 capas)
    const eyeX = 20, eyeY = -15;
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 14, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.lightBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 9, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.ellipse(eyeX + 2, eyeY, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

    // Pico Geométrico
    ctx.fillStyle = colors.lightGold;
    ctx.beginPath();
    ctx.moveTo(55, -5);   
    ctx.lineTo(95, 10);   
    ctx.lineTo(50, 25);   
    ctx.lineTo(40, 10);   
    ctx.fill();

    ctx.restore();
}

function drawFeet(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    
    // Pata izquierda
    ctx.beginPath();
    ctx.ellipse(10, 90, 15, 25, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Pata derecha
    ctx.beginPath();
    ctx.ellipse(40, 80, 15, 25, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
}