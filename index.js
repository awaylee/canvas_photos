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
    $('.img').css({"width":image.width + "px", "height":image.height + "px", "top": String(-topMargin)+"px", "left":String(-leftMargin)+"px"});
    initCanvas();
}

function initCanvas() {
    var theLeft = leftMargin<0?-leftMargin:0;
    var theTop = topMargin<0?--topMargin:0;

    clippingRegion = {x:Math.random()*(canvas.width-2*radius-2*theLeft)+radius+theLeft, y:Math.random()*(canvas.height-2*radius-2*theTop)+radius+theTop, r:radius};
    draw(image,clippingRegion);
}

function draw(image,clippingRegion) {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.save();
    setClippingRegion(clippingRegion);
    context.drawImage(image,Math.max(leftMargin,0),Math.max(topMargin,0),
        Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height),
        leftMargin<0?-leftMargin:0,topMargin<0?-topMargin:0,
        Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height));
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
};

canvas.addEventListener('touchstart',function(e){
    e.preventDefault()
});