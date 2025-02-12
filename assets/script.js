var paintingImages = [
    'images/painting1.png', 'images/painting2.png', 'images/painting3.png', 
    'images/painting4.png', 'images/painting5.png', 'images/painting6.png', 
    'images/painting7.png', 'images/painting8.png', 'images/painting9.png', 
    'images/painting10.png'
];

const randomPainting = document.getElementById('paintingimages');
let interval;

function startAnimation() {
    interval = setInterval(function () {
        var index = Math.floor(Math.random() * paintingImages.length);
        var url = paintingImages[index];
        randomPainting.src = url;
    }, 900); // Change the image every 900 milliseconds
}

function stopAnimation() {
    clearInterval(interval);
}

document.getElementById('pauseButton').addEventListener('click', function () {
    if (interval) {
        stopAnimation();
        interval = null;
        this.textContent = 'Resume';
    } else {
        startAnimation();
        this.textContent = 'Pause';
    }
});

startAnimation();

