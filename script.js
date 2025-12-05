// -------------------------
// Constellation Animation (Home)
// -------------------------
function constellationSetup(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    const nodes = [];
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Lines
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(140, 140, 140, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        // Nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(140, 140, 140, 0.6)';
            ctx.fill();

            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });

        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', resize);
}
constellationSetup('constellation-canvas');


// -------------------------
// Particle Animation (Reusable)
// -------------------------
function createParticles(canvasId, count = 50) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        // Fallback if section height not ready
        canvas.height = canvas.parentElement.scrollHeight || window.innerHeight;
    }
    resize();

    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(140, 140, 140, ${p.opacity})`;
            ctx.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });

        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', resize);
}

// Initialize particles for different sections
createParticles('particles-canvas', 50); // About
createParticles('particles-project', 70); // Projects
createParticles('particles-skill', 50); // Skills
createParticles('particles-contact', 30); // Contact


// -------------------------
// Matrix Rain (Projects)
// -------------------------
function matrixRain(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.scrollHeight || window.innerHeight;
    }
    resize();

    const matrix = '01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function animate() {
        ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(140, 140, 140, 0.25)';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        setTimeout(() => requestAnimationFrame(animate), 50);
    }
    animate();
    window.addEventListener('resize', resize);
}
matrixRain('matrix-canvas');

// -------------------------
// Pulsing Grid (Skills)
// -------------------------
function pulsingGrid(canvasId, spacing = 50) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const points = [];
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            points.push({
                x,
                y,
                radius: Math.random() * 2 + 1,
                pulseDir: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        points.forEach(p => {
            p.radius += 0.05 * p.pulseDir;
            if (p.radius > 4 || p.radius < 1) p.pulseDir *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(140, 140, 140, 0.5)';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', resize);
}

// Initialize pulsing grid on Skills section
pulsingGrid('particles-skill', 60);


// -------------------------
// Floating Shapes (Contact)
// -------------------------
function floatingShapes(canvasId, count = 20) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const shapes = [];
    const shapeTypes = ['circle', 'triangle', 'square'];
    for (let i = 0; i < count; i++) {
        shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 15 + 5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
            opacity: Math.random() * 0.4 + 0.2
        });
    }

    function drawShape(s) {
        ctx.fillStyle = `rgba(140,140,140,${s.opacity})`;
        ctx.beginPath();
        if (s.type === 'circle') {
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        } else if (s.type === 'triangle') {
            ctx.moveTo(s.x, s.y - s.size);
            ctx.lineTo(s.x - s.size, s.y + s.size);
            ctx.lineTo(s.x + s.size, s.y + s.size);
            ctx.closePath();
        } else if (s.type === 'square') {
            ctx.rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
        }
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(s => {
            s.x += s.speedX;
            s.y += s.speedY;

            if (s.x < 0 || s.x > canvas.width) s.speedX *= -1;
            if (s.y < 0 || s.y > canvas.height) s.speedY *= -1;

            drawShape(s);
        });

        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', resize);
}

// Initialize floating shapes on Contact section
floatingShapes('particles-contact', 25);


// -------------------------
// Smooth scrolling
// -------------------------
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 70;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
});

// -------------------------
// Mobile menu toggle
// -------------------------
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('navLinks');
    
    if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});
