const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];
const colors = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(173,216,230,0.8)',
    'rgba(212,211,211,0.8)',
];
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

let mouse = {
    x: null,
    y: null,
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // ctx.fillStyle = 'white';
        // ctx.fill();
        // ctx.strockStyle = 'white';
        // ctx.strock;
    }

    update() {
        if (
            this.x + this.size * 2 > canvas.width ||
            this.x - this.seize * 2 < 0
        ) {
            this.directionX = -this.directionX;
        }
        if (
            this.y + this.size * 2 > canvas.width ||
            this.y - this.seize * 2 < 0
        ) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        if (
            mouse.x - this.x < mouseRadius &&
            mouse.x - this.x > -mouseRadius &&
            mouse.y - this.y < mouseRadius &&
            mouse.y - this.y > -mouseRadius
        ) {
            if (this.size < maxSize) {
                this.size += 2;
            }
        } else if (this.size > minSize) {
            this.size -= 0.1;
        }

        if (this.size < 0) {
            this.size = 0;
        }

        this.draw();
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < 500; i++) {
        let size = 0;
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = Math.random() * 0.2 - 0.1;
        let directionY = Math.random() * 0.2 - 0.1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particleArray.push(
            new Particle(x, y, directionX, directionY, size, color)
        );
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

setInterval(function () {
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);
