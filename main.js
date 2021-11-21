img = "";
status = "";
object = [];

function preload()
{
    img = loadImage('cricket.webp');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object_detection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded()
{
    console.log("cocossd is initialized");
    status = true;
    object_detection.detect(video, gotResult);
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        object = results;
    }


}

function draw()
{
    image(video, 0, 0, 640, 420);

    if(status != "")
    {
        object_detection.detect(video, gotResult);

        for(i = 0; i < object.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Object Detected";
            document.getElementById("number_of_objects").innerHTML = "The number of detected objects: " + object.length;
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 20, object[i].y+ 20);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }

}