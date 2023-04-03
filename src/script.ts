const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const decreaseBtn: HTMLElement = document.getElementById('decrease');
const increaseBtn: HTMLElement = document.getElementById('increase');
const clearEl: HTMLElement = document.getElementById('clear');
const sizeEl: HTMLElement = document.getElementById('size');
const colorEl: HTMLInputElement = document.getElementById('color') as HTMLInputElement;

const ctx = canvas.getContext('2d')!;

let size: number = 10;
let isPressed: boolean = false;
let color: string = 'black';
let x: number | undefined;
let y: number | undefined;

decreaseBtn.addEventListener('click', () => {
    size--;
    sizeEl.innerHTML = size.toString();

    if (size < 0) {
        size = 1;
        sizeEl.innerHTML = '0';
    }
});

increaseBtn.addEventListener('click', () => {
    size++;
    sizeEl.innerHTML = size.toString();

    if (size > 50) {
        size = 50;
    }
});

colorEl.addEventListener('change', (e) => {
    color = (e.target as HTMLInputElement).value;
});

clearEl.addEventListener('click', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}
