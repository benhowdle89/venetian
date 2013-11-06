var venetian = document.querySelector('#venetian'),
    images = venetian.querySelectorAll('img'),
    total = images.length,
    width = venetian.clientWidth,
    division = Math.floor(width / total);

for (var i = 1; i < total; i++) {
    images[i].style.display = 'none';
}

venetian.addEventListener('mousemove', function (e) {
    var left = e.x;
    var section = ~~ ((left / width) * total);
    showImage(section);
});

function showImage(index) {
    for (var i = 1; i < total; i++) {
        images[i].style.display = (i === index) ? 'block' : 'none';
    }
}
