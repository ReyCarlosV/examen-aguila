/**
 * ==============================================================================
 * APLICACIÓN: Recreación Geométrica de Águila V5 (Versión Definitiva)
 * DESCRIPCIÓN: Utiliza una matriz de paralelogramos vectoriales para generar 
 * un mosaico de triángulos perfectamente entrelazados, idéntico a la imagen 
 * original. Cumple con el requisito de más de 30 figuras (> 70 figuras reales).
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
        lightBlueWing: "#91D6EB",  
        lightDeepGold: "#e2be47"   
    };

    // 1. Limpiar lienzo y dibujar fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas, colors);
    drawClouds(ctx, colors);

    // 2. Mover el Punto Cero (0,0) al centro exacto del lienzo
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 50);

    
    
    // 4. Ala Izquierda (Generador de Matriz Geométrica)
    ctx.save();
    drawGeometricWingMatrix(ctx, colors);
    ctx.restore();

    drawTail(ctx, colors);
    // 5. Ala Derecha (Efecto Espejo Perfecto)
    ctx.save();
    ctx.scale(-1, 1); // Refleja todo horizontalmente
    drawGeometricWingMatrix(ctx, colors);
    ctx.restore();

    // 6. Cuerpo, Patas y Cabeza (Capas Superiores)
    drawMusloUno(ctx, colors);
    drawBody(ctx, colors);
    drawFeet(ctx, colors);
    drawMusloDos(ctx, colors);
    drawHead(ctx, colors);

    ctx.restore();
}

/** * FONDOS Y NUBES */
function drawBackground(ctx, canvas, colors) {
    ctx.fillStyle = colors.skyBlue;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const groundHeight = canvas.height * 0.15;
    ctx.fillStyle = colors.grassGreen;
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

/** * FONDOS Y NUBES */
function drawClouds(ctx, colors) {
    // Añadimos un tercer parámetro 'escala' para controlar el tamaño de cada nube
    const drawCloud = (x, y, escala = 1) => {
        ctx.save(); // Guardamos el estado actual del lienzo
        ctx.translate(x, y); // Movemos el punto de origen a las coordenadas de la nube
        ctx.scale(escala, escala); // Aplicamos el multiplicador de tamaño
        ctx.fillStyle = colors.cloudWhite;
        ctx.beginPath();
        // Dibujamos los círculos de la nube relativos a su propio centro (0,0)
        ctx.arc(-15, 9, 25, 0, Math.PI * 2);
        ctx.arc(60, -30, 50, 0, Math.PI * 2);
        ctx.arc(100, -5, 40, 0, Math.PI * 2);
        ctx.arc(15, -25, 35, 0, Math.PI * 2);
        ctx.fill();
        // Base plana geométrica
        ctx.fillRect(-10, -25, 120, 60);
        ctx.restore(); // Restauramos el lienzo para que no afecte a las siguientes figuras
    };
    drawCloud(120, 175, 1.9); 
    drawCloud(1000, 200, 1.7); 
    drawCloud(850, 525, 1);
}

/** * MUSLOS (Figuras: 2 Círculos) */
function drawMusloUno(ctx, colors) {
    ctx.fillStyle = colors.lightDeepGold; // Usamos el color del cuerpo
    ctx.beginPath();
    ctx.arc(-60, 90, 55, 0, Math.PI * 2); 
    ctx.fill();
}

function drawMusloDos(ctx, colors) {
    ctx.fillStyle = colors.lightDeepGold; // Usamos el color del cuerpo
    ctx.beginPath();
    ctx.arc(-80, 85, 50, 0, Math.PI * 2); 
    ctx.fill();
}

/** * ALAS GEOMÉTRICAS (Matriz de Triángulos Entrelazados) */
function drawGeometricWingMatrix(ctx, colors) {
    // 1. Base sólida del ala para que no se vea el cielo a través de los triángulos
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(-300, -100); 
    ctx.lineTo(-350, 80); 
    ctx.lineTo(-80, 180);
    ctx.closePath();
    ctx.fill();

    // 2. Función para dibujar triángulos con delineado
    const drawTri = (x1, y1, x2, y2, x3, y3, color) => {
        ctx.fillStyle = color;
        ctx.beginPath(); 
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); 
        ctx.closePath(); 
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.15)"; 
        ctx.lineWidth = 1; 
        ctx.stroke();
    };

    // 3. Configuración de la cuadrícula matemática
    let startX = -40, startY = 20;
    let dx1 = -65, dy1 = -25; // Vector hacia arriba/afuera (hueso del ala)
    let dx2 = -35, dy2 = 40;  // Vector hacia abajo (puntas de plumas)
    let colorPattern = [colors.darkBlueWing, colors.lightGold, colors.lightBlueWing, colors.deepGold];

    // 4. Bucle para generar el mosaico sin fisuras
    for(let col = 0; col < 4; col++) {
        for(let row = 0; row < 3; row++) {
            // Puntos del paralelogramo base
            let px = startX + (col * dx1) + (row * dx2);
            let py = startY + (col * dy1) + (row * dy2);
            let p2x = px + dx1, p2y = py + dy1;
            let p3x = px + dx2, p3y = py + dy2;
            let p4x = px + dx1 + dx2, p4y = py + dy1 + dy2;

            // Triángulo Superior
            let color1 = colorPattern[(col + row) % 4];
            drawTri(px, py, p2x, p2y, p3x, p3y, color1);
            
            // Triángulo Inferior (completa el paralelogramo)
            let color2 = colorPattern[(col + row + 1) % 4]; 
            drawTri(p2x, p2y, p3x, p3y, p4x, p4y, color2);
        }
    }
}

/** * CUERPO Y COLA */
function drawBody(ctx, colors) {
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath();
    ctx.ellipse(0, 50, 130, 80, (-20.25 * Math.PI) / 180, 0, Math.PI * 2);
    ctx.fill();
}

function drawTail(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    ctx.save();
    ctx.translate(-50, 125); 
    ctx.rotate(Math.PI * 0.8); 

    const w = 120, h = 30;
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(0, i * 25, w, h);
        ctx.strokeStyle = colors.deepGold;
        ctx.lineWidth = 2;
        ctx.strokeRect(0, i * 25, w, h);
    }
    ctx.restore();
}

/** * CABEZA Y PATAS */
function drawHead(ctx, colors) {
    ctx.save();
    ctx.translate(130, -10); // Posición de la cabeza
    
    // Cabeza
    ctx.fillStyle = colors.deepGold;
    ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 2); ctx.fill();

    // Ojo concéntrico
    const eyeX = 25, eyeY = -15;
    ctx.fillStyle = colors.darkBlueWing; ctx.beginPath(); ctx.arc(eyeX, eyeY, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = colors.lightBlueWing; ctx.beginPath(); ctx.arc(eyeX, eyeY, 10, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = colors.darkBlueWing; ctx.beginPath(); ctx.ellipse(eyeX + 2, eyeY, 5, 8, 0, 0, Math.PI * 2); ctx.fill();

    // Pico Geométrico
    ctx.fillStyle = colors.lightGold;
    ctx.beginPath();
    ctx.moveTo(60, -5);   
    ctx.lineTo(105, 10);   
    ctx.lineTo(55, 25);   
    ctx.lineTo(45, 10);   
    ctx.fill();

    ctx.restore();
}

function drawFeet(ctx, colors) {
    ctx.fillStyle = colors.lightGold;
    ctx.beginPath(); ctx.ellipse(-100, 130, 20, 25, Math.PI / 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-90, 130, 20, 25, Math.PI / 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-80, 130, 20, 25, Math.PI / 6, 0, Math.PI * 2); ctx.fill();
}