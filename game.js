var rotationActive = false;
var startAngle = 0;
var currentAngle = 0;
var correctRotation = 0;
var tolerance = 1.5;
var image = document.getElementById('image');
var caption = document.getElementById('caption');
var originalStory = document.getElementById('original_story');
var keyArray = Object.keys(all_images);


image.addEventListener('mousedown', function (event) {
    rotationActive = true;
    startAngle = getAngle(event);
});

image.addEventListener('touchstart', function (event) {
  rotationActive = true;
  startAngle = getAngle(event);
});

image.addEventListener('mouseup', function () {
    rotationActive = false;
    currentAngle = getRotationAngle();
});

image.addEventListener('touchend', function () {
    rotationActive = false;
    currentAngle = getRotationAngle();
});

function setDisplay(angle) {
  if (angle!=undefined) {
    if (Math.abs(angle-correctRotation) < tolerance) {
      setCorrect();
    } else {
      setIncorrect();
    }
  }
}

image.addEventListener('mousemove', function (event) {
    if (rotationActive) {
        var angle = getAngle(event) - startAngle + currentAngle;
        image.style.transform = 'rotate(' + angle + 'deg)';
    }
    setDisplay(angle);
});

image.addEventListener('touchmove', function (event) {
    if (rotationActive) {
        var angle = getAngle(event) - startAngle + currentAngle;
        image.style.transform = 'rotate(' + angle + 'deg)';
    }
    setDisplay(angle);
});

function setCorrect() {
  document.getElementById("correct").style.display="block";
  document.getElementById("incorrect").style.display="none";
}

function setIncorrect() {
  document.getElementById("correct").style.display="none";
  document.getElementById("incorrect").style.display="block";
}

function getAngle(event) {
    var rect = image.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;
    if (event.clientX) {
      var x = event.clientX - centerX;
      var y = event.clientY - centerY;
    } else if (event.touches) {
      var x = event.touches[0].clientX - centerX;
      var y = event.touches[0].clientY - centerY;
    }
    var angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle;
}

function getRotationAngle() {
    var transformStyle = window.getComputedStyle(image).getPropertyValue('transform');
    var matrix = new DOMMatrix(transformStyle);
    var angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    return angle;
}

function resetImage() {
  image.style.transform = 'rotate(0deg)';
  currentAngle = 0;
  setIncorrect();
}

function setImage(key) {
  imageObj = all_images[key];
  image.src = imageObj.image;
  caption.innerHTML = imageObj.caption;
  originalStory.href = imageObj.story;
  correctRotation = imageObj.angle;
}

function setRandomImage() {
  randKey = parseInt(Math.random() * keyArray.length);
  setImage(randKey);
}

setRandomImage();
