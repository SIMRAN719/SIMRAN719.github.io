// Constellation Animation (Home)
function constellationSetup(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
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


// Particle Animation (Reusable)
function createParticles(canvasId, count = 50) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight || 500;
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


// Floating Shapes (Contact)
function floatingShapes(canvasId, count = 20) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight || 500;
    }
    resize();

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

// Initialize all animations
window.addEventListener('DOMContentLoaded', function() {
    constellationSetup('constellation-canvas');
    createParticles('particles-canvas', 50);
    createParticles('particles-project', 70);
    createParticles('particles-skill', 50);
    floatingShapes('particles-contact', 25);
});


// Mobile menu toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('navLinks');
    
    if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});


// Smooth scrolling
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