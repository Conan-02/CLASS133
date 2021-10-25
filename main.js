img0 = "";
img1 = "";
img2 = "";
img3 = "";
status = "";
object = [];

function preload() {
    img0 = loadImage("img0.jpg");
    img1 = loadImage("img1.jpg");
    img2 = loadImage("img2.jpg");
    img3 = loadImage("img3.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objDetect = ml5.objectDetector('cocossd', loaded);
}

function draw()  {
    image(img1, 0, 0, 640, 420);
    
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECT DETECTED";

            fill("#ff0000");
            stroke("#ff0000");
            strokeWeight(1);
            percent = floor(object[i].confidence * 100);
            text("NAME = " + object[i].label + ", CONFIDENCE = " + percent, object[i].x, object[i].y - 10);
            noFill();
            strokeWeight(2);
            rect(object[i].x, object[i].y, object[i].width, object[i].height, 10);
        }
    }
}

function loaded() {
    console.log("model loaded");
    status = true;
    objDetect.detect(img1, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}