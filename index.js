var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight ;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
image.src = 'img.jpg';
var clippingRegion = {x:400, y:200, r:50};
var radius = 50;
var leftMargin,topMargin;


image.onload = function (e) {
    leftMargin = (image.width - canvas.width)/2;
    topMargin = (image.height - canvas.height)/2;
    $('.content').css({"width":canvasWidth + 'px', "height": canvasHeight + 'px'});
    $('.img').css({"width":image.width + "px", "height":image.height + "px", "top": "-"+topMargin+"px", "left":"-"+leftMargin+"px"});
    initCanvas();
}

function initCanvas() {
    clippingRegion = {x:Math.random()*(canvas.width-2*radius)+radius, y:Math.random()*(canvas.height-2*radius)+radius, r:radius};
    draw(image,clippingRegion);
}

function draw(image,clippingRegion) {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    setClippingRegion(clippingRegion);
    context.drawImage(image,leftMargin,topMargin,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight);
    context.restore();

}

function setClippingRegion (clippingRegion) {
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r,0, Math.PI*2, false);
    context.clip();
    context.drawImage(image,leftMargin,topMargin,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
}

function show() {
    var theAnimation = setInterval(function(){
        clippingRegion.r += 20;
        if(clippingRegion.r > Math.max(canvas.width,canvas.height)) {
            clearInterval(theAnimation);
        }
        draw(image, clippingRegion);
    },30);
}

function reset() {
    initCanvas();
}