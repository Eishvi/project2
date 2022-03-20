img=""
Status=""
objects=[];
function preload(){
img=loadImage("kitchen.jpg");
}
function setup(){
    canvas=createCanvas(500, 400);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function draw(){
    image(img, 0, 0, 500, 400);
    if(Status != ""){
        for(i=0; i<objects.length;i++){
            console.log("inside the for loop");
            document.getElementById("status").innerHTML="Status:Object Detected";
            fill("#610c04");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#610c04");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    Status=true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}