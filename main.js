status = "";
object = [];

function setup() {
    canvas = createCanvas(480, 360)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: detecting object"
    input = document.getElementById("input").value;
}



function modelLoaded() {
    console.log("Model has loaded")
    status = true;
}

function draw() {
    image(video, 0, 0, 480, 360)
if(status != "") {
    objectDetector.detect(video, gotResults)
    for(i =0; i < object.length; i++) {
        document.getElementById("status").innerHTML = "Status: Detecting object"
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + object.length;
        
        fill("lightpurple")
        percent = floor(object[i].confidence*100)
        text(object[i].label + " " + percent + "%", object[i].x, object[i].y)
        noFill()
        stroke("white")
        rect(object[i].x, object[i].y, object[i].width, object[i].height)

        if(object[i].label == input) {
            document.getElementById("status").innerHTML = input + " Found" 
        }
        else {
            document.getElementById("status").innerHTML = input + "Not found"
        }
    }
}


}

function gotResults(error, results)  {
    if(error) {
        console.log(error)
    }
    else {
        console.log(results)
        object = results;
    }
}