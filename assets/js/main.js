/**
 * ==============================================================================
 * APLICACIÓN: Recreación Geométrica de Águila V4 (Versión Fiel al Original)
 * DESCRIPCIÓN: Generación de mosaico de alas utilizando un algoritmo de abanico 
 * con más de 40 triángulos individuales superpuestos para recrear la textura 
 * puntiaguda original. Total de figuras básicas utilizadas: > 70.
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

    // 1. Limpiar y Fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas, colors);
    drawClouds(ctx, colors);

    // 2. Mover Punto Cero (0,0) al centro exacto
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 20);

    // 3. Cola (Capa inferior)
    drawTail(ctx, colors);
    
    // 4. Ala Izquierda (Abanico de Triángulos)
    ctx.save();
    ctx.translate(-40, -20); // Posición del hombro
    drawFeatheredWing(ctx, colors);
    ctx.restore();

    // 5. Ala Derecha (Efecto Espejo)
    ctx.save();
    ctx.translate(40, -20);  // Posición del hombro
    ctx.scale(-1, 1);        // Refleja todo horizontalmente
    drawFeatheredWing(ctx, colors);
    ctx.restore();

    // 6. Cuerpo, Patas y Cabeza (Capas superiores)
    drawBody(ctx, colors);
    drawFeet(ctx, colors);
    drawHead(ctx, colors);

    ctx.restore();
}

/** * FONDOS Y NUBES (Figuras: 2 Rectángulos, 12 Círculos, 3 Rectángulos) */
function drawBackground(ctx, canvas, colors) {
    ctx.fillStyle = colors.skyBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const groundHeight = canvas.height * 0.15;
    ctx.fillStyle = colors.grassGreen;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawClouds(ctx, colors) {
    const drawStylizedCloud = (x, y) => {
        ctx.fillStyle = colors.cloudWhite;
        ctx.beginPath();
        // Círculos superpuestos
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.arc(x + 40, y - 30, 50, 0, Math.PI * 2);
        ctx.arc(x + 90, y - 10, 45, 0, Math.PI * 2);
        ctx.arc(x + 50, y + 20, 40, 0, Math.PI * 2);
        ctx.fill();
        // Base plana para que se vea geométrica
        ctx.fillRect(x - 20, y, 130, 40);
    };

    drawStylizedCloud(180, 200);
    drawStylizedCloud(850, 220);
    drawStylizedCloud(600, 580);
}

/** * ALAS GEOMÉTRICAS (Figuras: > 40 Triángulos en total) 
 * Dibuja un abanico de plumas puntiagudas para igualar la imagen original.
 */
function drawFeatheredWing(ctx, colors) {
    // 1. Base sólida dorada para que no haya huecos
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(-300, -120); // Extremo superior
    ctx.lineTo(-340, -40);  // Extremo medio
    ctx.lineTo(-100, 140);  // Extremo inferior
    ctx.closePath();
    ctx.fill();

    const pattern = [colors.darkBlueWing, colors.lightGold, colors.lightBlueWing, colors.deepGold];

    // 2. Ciclo para generar el mosaico de plumas puntiagudas
    // 4 filas de plumas, cada fila tiene menos plumas conforme bajamos
    for (let row = 0; row < 4; row++) {
        let numFeathers = 7 - row; // Fila 0: 7 plumas, Fila 1: 6 plumas, etc.
        
        for (let f = 0; f < numFeathers; f++) {
            ctx.save();
            
            // Interpolar posiciones para que sigan la forma del ala
            let x = -40 - (f * 40) - (row * 15);
            let y = -20 - (f * 15) + (row * 35);
            
            ctx.translate(x, y);
            
            // Rotación progresiva para que las plumas se abran como abanico
            ctx.rotate(-Math.PI / 12 + (f * 0.04)); 

            // Color basado en el patrón
            ctx.fillStyle = pattern[(row + f) % 4];
            
            // Dibujar un triángulo puntiagudo (Figura básica)
            ctx.beginPath();
            ctx.moveTo(0, 0);          // Base interior
            ctx.lineTo(-55, -25);      // Punta superior
            ctx.lineTo(-35, 25);       // Punta inferior
            ctx.closePath();
            ctx.fill();

            // Delineado para separar cada pluma geométricamente
            ctx.strokeStyle = "rgba(0,0,0,0.15)";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }
    }
}

/** * CUERPO Y COLA (Figuras: 1 Elipse, 4 Rectángulos) */
function drawBody(ctx, colors) {
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.ellipse(0, 0, 150, 100, -Math.PI / 18, 0, Math.PI * 2);
    ctx.fill();
}

function drawTail(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    ctx.save();
    ctx.translate(-110, 50); 
    ctx.rotate(Math.PI * 0.75); // Rotar hacia abajo a la izquierda

    const w = 110, h = 25;
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(0, i * 22, w, h);
        ctx.strokeStyle = colors.deepGold;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, i * 22, w, h);
    }
    ctx.restore();
}

/** * CABEZA Y PATAS (Figuras: 2 Círculos, 3 Elipses, 1 Polígono) */
function drawHead(ctx, colors) {
    ctx.save();
    ctx.translate(130, -50); 

    // Cabeza
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.fill();

    // Ojo (3 capas concéntricas)
    const eyeX = 20, eyeY = -15;
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 14, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.lightBlueWing;
    ctx.beginPath(); ctx.arc(eyeX, eyeY, 9, 0, Math.PI * 2); ctx.fill();
    
    ctx.fillStyle = colors.darkBlueWing;
    ctx.beginPath(); ctx.ellipse(eyeX + 2, eyeY, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

    // Pico Geométrico (Polígono de 4 lados)
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
    ctx.beginPath(); ctx.ellipse(10, 90, 15, 25, Math.PI / 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(40, 80, 15, 25, Math.PI / 6, 0, Math.PI * 2); ctx.fill();
}