var canvas = document.querySelector("canvas");
var blush = canvas.getContext("2d");




var radius = 10;
var xRandom;
var yRandom;

function ratio(x, y, radius, color) {
	blush.fillStyle = color;
	blush.beginPath();
	blush.arc(x, y, radius, 0, 2 * Math.PI);
	blush.fill();
}

function clearCanvas() {
	blush.clearRect(0, 0, 800, 600);
}



function objective(x, y) {
	ratio(x, y, radius + 20, "red");
	ratio(x, y, radius + 10, "white");
	ratio(x, y, radius, "red");
}


function randomPosition(maximo) {

	return Math.floor(Math.random() * maximo);

}

function reloadCanvas() {
	clearCanvas();
	xRandom = randomPosition(750);
	yRandom = randomPosition(500);
	objective(xRandom, yRandom);
}



const easy = document.querySelector(".easy");
const normal = document.querySelector(".normal");
const hard = document.querySelector(".hard");
const insane = document.querySelector(".insane");

let difficultyValue = 800;

interval(easy, 1600);
interval(normal, 800);
interval(hard, 500);
interval(insane, 300);


var intervalId;
function interval(difficulty, difficultyValue) {
	difficulty.onclick = () => {
		if (!intervalId) {
			intervalId = setInterval(reloadCanvas, difficultyValue);
		} else {
			clearCanvas();
			clearInterval(intervalId);
			intervalId = null;
			intervalId = setInterval(reloadCanvas, difficultyValue);
		}
	};

}

let points = 0;
let ammo = 50;
let maxPoints = 0;

function shot(e) {
	document.querySelector(".points").classList.remove('visible');

	const img0 = document.querySelector(".img0");
	const img1 = document.querySelector(".img1");
	const img2 = document.querySelector(".img2");
	const img3 = document.querySelector(".img3");
	const head0 = document.querySelector(".head0");
	const head3 = document.querySelector(".head3");

	const imgArr = [img0, img1, img2, img3, head0, head3];


	function imgAnimation(a, b, time) {
		time *= 60;
		setTimeout(() => {
			imgArr[a].classList.remove('visible');
			imgArr[b].classList.add('visible');
		}, time);
	}
	function pistolAnimation() {
		imgAnimation(0, 1, 1);
		imgAnimation(1, 2, 2);
		imgAnimation(2, 3, 3);
		imgAnimation(3, 2, 4);
		imgAnimation(2, 0, 5);
	}
	pistolAnimation();

	var audio = new Audio('src/pistol.mp3');
	audio.volume = 0.5;
	audio.play();


	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;


	if ((x < xRandom + radius) &&
		(x > xRandom - radius) &&
		(y < yRandom + radius) &&
		(y > yRandom - radius)) {
		document.querySelector(".points").classList.add('visible');
		imgAnimation(4, 5, 1);
		imgAnimation(5, 4, 8);
		points += 10;
		document.querySelector(".pointsAmmount").innerHTML = points;


		if (points > maxPoints) {
			maxPoints = points;
			document.querySelector(".maxPoints").innerHTML = maxPoints;
		}
	}

	ammo -= 1;

	if (ammo == -1) {
		ammo = 50;
		ammo -= 1;
		points = 0;
		document.querySelector(".pointsAmmount").innerHTML = points;
	};

	document.querySelector(".ammo").innerHTML = ammo;
	document.querySelector(".bullet").innerHTML = ammo;


}

function mouseevent(e) {
	const head0 = document.querySelector(".head0");
	const head1 = document.querySelector(".head1");
	const head2 = document.querySelector(".head2");

	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;


	if ((x < 410 && x > 0) && (y < canvas.height && y > 0)) {
		head1.classList.add('visible');
		head2.classList.remove('visible');
		head0.classList.remove('visible');
	} else {
		head0.classList.add('visible');
		head1.classList.remove('visible');
	}

	if ((x > 410 && x < canvas.width) && (y < canvas.height && y > 0)) {
		head2.classList.add('visible');
		head1.classList.remove('visible');
		head0.classList.remove('visible');
	} else {
		head0.classList.add('visible');
		head2.classList.remove('visible');
	}
}
canvas.onmousemove = mouseevent;
canvas.onclick = shot;



