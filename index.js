var canvasWidth = 800;
var canvasHeight = 450 ;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
image.src = 'img.jpg';
var clippingRegion = {x:400, y:200, r:50}

image.onload = function (e) {
    initCanvas();
}

function initCanvas() {
    draw(image,clippingRegion);
}

function draw(image,clippingRegion) {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    setClippingRegion(clippingRegion);
    context.drawImage(image,0,0);
    context.restore();

}

function setClippingRegion (clippingRegion) {
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r,0, Math.PI*2);
    context.clip();
    context.drawImage(image,0,0);
}