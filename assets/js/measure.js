import * as THREE from "../../libs/three.module.js";

import {ARButton}
from "../../libs/ARButton.js";



let camera;

let scene;

let renderer;


let controller;


let reticle;


let hitTestSource=null;

let hitTestRequested=false;



let point1=null;

let point2=null;



let line;



const flute =
parseFloat(
localStorage.getItem("flute")
)||3;



init();

animate();



function init(){


scene =
new THREE.Scene();



camera =
new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.01,
20
);



renderer =
new THREE.WebGLRenderer({

antialias:true,

alpha:true

});


renderer.setSize(

window.innerWidth,

window.innerHeight

);



renderer.xr.enabled=true;



document.body.appendChild(
renderer.domElement
);




document.body.appendChild(

ARButton.createButton(

renderer,

{

requiredFeatures:[
"hit-test"
]

}

)

);





// titik AR

reticle =
new THREE.Mesh(

new THREE.RingGeometry(
0.08,
0.1,
32
),

new THREE.MeshBasicMaterial({

color:0x00ff00

})

);



reticle.rotation.x=
-Math.PI/2;


reticle.matrixAutoUpdate=false;


reticle.visible=false;


scene.add(reticle);





controller =
renderer.xr.getController(0);


controller.addEventListener(

"select",

selectPoint

);


scene.add(controller);



}





function selectPoint(){


if(!reticle.visible)
return;



let position =
new THREE.Vector3();


position.setFromMatrixPosition(
reticle.matrix
);



if(point1==null){


point1=position;


document.getElementById("status")
.innerHTML=
"Titik kedua";


}

else{


point2=position;


drawLine();


calculate();


}


}







function drawLine(){


const geometry =
new THREE.BufferGeometry()
.setFromPoints([

point1,

point2

]);



const material =
new THREE.LineBasicMaterial({

color:0x0088ff,

linewidth:5

});



line =
new THREE.Line(
geometry,
material
);



scene.add(line);


}







function calculate(){


let meter =
point1.distanceTo(point2);



let mm =
meter*1000;



let sheet =
Math.floor(
mm/flute
);



document.getElementById("distance")
.innerHTML=

mm.toFixed(0)
+" mm";



document.getElementById("sheet")
.innerHTML=

sheet+
" Sheet";


}





function animate(){


renderer.setAnimationLoop(

(timestamp,frame)=>{


if(frame){


let referenceSpace =
renderer.xr.getReferenceSpace();


let session =
renderer.xr.getSession();



if(!hitTestRequested){


session.requestReferenceSpace(

"viewer"

)

.then(space=>{


session.requestHitTestSource({

space:space

})

.then(source=>{


hitTestSource=source;


});


});


hitTestRequested=true;


}





if(hitTestSource){


let hitTestResults =
frame.getHitTestResults(

hitTestSource

);



if(hitTestResults.length){


let hit =
hitTestResults[0];


let pose =
hit.getPose(

referenceSpace

);


reticle.visible=true;


reticle.matrix.fromArray(

pose.transform.matrix

);


}


}


}



renderer.render(
scene,
camera
);


}

);


}
