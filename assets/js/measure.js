const video =
document.getElementById("camera");


const canvas =
document.getElementById("canvas");


const ctx =
canvas.getContext("2d");



let measuring=false;


let point1=null;

let point2=null;



let realHeight=0;



const flute =
parseFloat(
localStorage.getItem("flute")
) || 3;



// =====================
// CAMERA
// =====================


async function startCamera(){


try{


const stream =
await navigator.mediaDevices.getUserMedia({

video:{

facingMode:{
ideal:"environment"
}

}


});


video.srcObject=stream;



document.getElementById("status")
.innerHTML=
"Kamera aktif";


}


catch(error){


document.getElementById("status")
.innerHTML=
"Kamera gagal";


console.log(error);


}


}



startCamera();





// =====================
// CANVAS SIZE
// =====================


function resizeCanvas(){


canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;


}


resizeCanvas();


window.onresize=resizeCanvas;





// =====================
// MULAI UKUR
// =====================


document
.getElementById("start")
.onclick=function(){


measuring=true;


point1=null;

point2=null;



document.getElementById("status")
.innerHTML=
"Klik titik pertama";


}






// =====================
// CLICK SCREEN
// =====================


canvas.onclick=function(e){


if(!measuring)
return;



let x=e.clientX;

let y=e.clientY;



if(point1==null){


point1={
x:x,
y:y
};


document.getElementById("status")
.innerHTML=
"Klik titik kedua";


}


else{


point2={

x:x,

y:y

};


calculate();



}


}





// =====================
// HITUNG
// =====================


function calculate(){


let pixelDistance =
Math.sqrt(

Math.pow(
point2.x-point1.x,
2
)

+

Math.pow(
point2.y-point1.y,
2
)

);



// sementara kalibrasi
// nanti diganti AR scale


realHeight =
pixelDistance;



let sheet =

Math.floor(
realHeight/flute
);



document
.getElementById("distance")
.innerHTML=

realHeight.toFixed(0)
+" mm";



document
.getElementById("sheet")
.innerHTML=

sheet+
" Sheet";



document
.getElementById("status")
.innerHTML=
"Selesai";


measuring=false;


}






// =====================
// GAMBAR GARIS
// =====================


function draw(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



if(point1){


ctx.beginPath();


ctx.arc(
point1.x,
point1.y,
8,
0,
Math.PI*2
);


ctx.fillStyle=
"red";


ctx.fill();


}



if(point1 && point2){


ctx.beginPath();


ctx.moveTo(
point1.x,
point1.y
);


ctx.lineTo(
point2.x,
point2.y
);



ctx.strokeStyle=
"#00aaff";


ctx.lineWidth=5;


ctx.stroke();



ctx.beginPath();


ctx.arc(
point2.x,
point2.y,
8,
0,
Math.PI*2
);


ctx.fillStyle=
"red";


ctx.fill();



}



requestAnimationFrame(draw);


}



draw();





// =====================
// RESET
// =====================


document
.getElementById("reset")
.onclick=function(){


point1=null;

point2=null;


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



document
.getElementById("distance")
.innerHTML=
"0 mm";


document
.getElementById("sheet")
.innerHTML=
"0 Sheet";


document
.getElementById("status")
.innerHTML=
"Klik Mulai Pengukuran";


}
