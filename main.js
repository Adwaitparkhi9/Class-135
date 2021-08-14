objectdetector = "";
img="";
object = [];
status="";

function preload(){
video=createVideo("video.mp4");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video.hide();
    objectdetector = ml5.objectDetector('cocossd',Modelloaded);
    document.getElementById("status").innerHTML="status:objectdetecting";
     
}
function Modelloaded(){
console.log("modelloaded");
status = true ;
video.loop();
video.volume(0);
video.speed(1);

}
function gotresult(error,results) {
    if (error){
        console.log(error);
    } 
    console.log(results);
    object = results;
}


function draw(){
    image(video,0,0,380,380);
    if(status!="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotresult);
        for (var i = 0; i < object.length; i++){    
        document.getElementById("status").innerHTML="Status : Object detecting";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ object.length;
        fill(r,g,b);
        percent = floor(object[i].confidence * 100);    
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}