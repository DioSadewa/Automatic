const video =
document.getElementById("camera");


async function startCamera(){


try{


const stream =
await navigator.mediaDevices.getUserMedia({

video:{

facingMode:{
ideal:"environment"
},

width:{
ideal:1920
},

height:{
ideal:1080
}


}


});


video.srcObject=stream;


document.getElementById("status")
.innerHTML=
"Kamera belakang aktif";


}


catch(error){


console.log(error);


document.getElementById("status")
.innerHTML=
"Kamera gagal : "+error;


}


}



startCamera();
