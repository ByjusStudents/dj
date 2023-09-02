song = "";
songs = "";
tint_color="";
canciones=[];

var i=0;

function preload()
{

	song = loadSound("Red Lights.mp3");
	song2 = loadSound("The Wanted.mp3");
	song3 = loadSound("The Chainsmokers.mp3");
	song4 = loadSound("LazaMorgan.mp3");
	song5 = loadSound("Locked Away.mp3");
	
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}


function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);

	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist 
	+ " scoreLeftWrist = " + scoreLeftWrist);
	
	

	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "
	+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "
	+ leftWristY);
		
  }
}

function draw() {
	
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	random_number_r = Math.floor(Math.random() * 255) + 1;
    random_number_g = Math.floor(Math.random() * 255) + 1;
    random_number_b = Math.floor(Math.random() * 255) + 1;
	tint("rgb("+random_number_r+","+random_number_g+","+random_number_b+")");
	
	var combo=document.getElementById("option_names");

	var seleccion=combo.options[combo.selectedIndex].text;
	if(seleccion=="Red Lights"){
		songs= song;
	}
	else if(seleccion=="The Wanted"){
		songs= song2;
	}
	else if(seleccion=="The Chainsmokers"){
		songs= song3;
	}

}


	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

		if(rightWristY > 0 && rightWristY <= 100)
		{
			document.getElementById("speed").innerHTML = "Speed = 0.5x";		
			songs.rate(0.5);
			
		}
		else if(rightWristY >100 && rightWristY <= 200)
		{
			document.getElementById("speed").innerHTML = "Speed = 1x";		
			songs.rate(1);
		}
		else if(rightWristY >200 && rightWristY <= 300)
		{
			document.getElementById("speed").innerHTML = "Speed = 1.5x";		
			songs.rate(1.5);
		}
		else if(rightWristY >300 && rightWristY <= 400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2x";		
			songs.rate(2);
		}
		else if(rightWristY >400)
		{
			document.getElementById("speed").innerHTML = "Speed = 2.5x";		
			songs.rate(2.5);
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		//circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume = " + volume;		
		songs.setVolume(volume);	
	}



function play()
{
	songs.play();
	songs.setVolume(1);
	songs.rate(1);
}
