const canvas = document.getElementById("canvas");
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const clearEl = document.getElementById("clear");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");

const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let x;
let y;

decreaseBtn.addEventListener("click", () => {
    size--;
    sizeEl.innerHTML = size;

    if (size < 0) {
        size = 1;
        sizeEl.innerHTML = 0;
    }
})

increaseBtn.addEventListener("click", () => {
    size++;
    sizeEl.innerHTML = size;

    if (size > 50) {
        size = 50;
    }
})

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
})

clearEl.addEventListener("click", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})


canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;

})

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;

})

canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}