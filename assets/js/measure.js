import * as THREE from "../../libs/three.module.js";

import { ARButton } 
from "../../libs/ARButton.js";



let camera;
let scene;
let renderer;



let controller;



let reticle;



let hitTestSource = null;

let hitTestSourceRequested = false;



let point1 = null;

let point2 = null;



let line;



const flute =
parseFloat(
localStorage.getItem("flute")
) || 3;





init();

animate();





function init(){



scene = new THREE.Scene();



camera =
new THREE.PerspectiveCamera(
70,
window.innerWidth /
window.innerHeight,
0.01,
20
);





renderer =
new THREE.WebGLRenderer({

antialias:true,

alpha:true

});



renderer.setPixelRatio(
window.devicePixelRatio
);


renderer.setSize(
window.innerWidth,
window.innerHeight
);


renderer.xr.enabled = true;



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





// reticle


const geometry =
new THREE.RingGeometry(
0.05,
0.08,
32
)
.rotateX(
-Math.PI/2
);



const material =
new THREE.MeshBasicMaterial({

color:0x00ffff

});



reticle =
new THREE.Mesh(
geometry,
material
);



reticle.matrixAutoUpdate=false;

reticle.visible=false;



scene.add(reticle);





controller =
renderer.xr.getController(0);


controller.addEventListener(
"select",
onSelect
);


scene.add(controller);



}





function onSelect(){



if(!reticle.visible)
return;




let position =
new THREE.Vector3();


position.setFromMatrixPosition(
reticle.matrix
);





if(point1===null){


point1 =
position.clone();



document.getElementById("status")
.innerHTML =
"Titik pertama tersimpan";



}

else{


point2 =
position.clone();



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

color:0x008cff

});



line =
new THREE.Line(
geometry,
material
);


scene.add(line);


}






function calculate(){



const meter =
point1.distanceTo(
point2
);



const mm =
meter*1000;



const sheet =
Math.floor(
mm/flute
);




document.getElementById("distance")
.innerHTML =
mm.toFixed(0)+" mm";



document.getElementById("sheet")
.innerHTML =
sheet+" Sheet";



document.getElementById("status")
.innerHTML =
"Selesai";



}






function animate(){


renderer.setAnimationLoop(
render
);


}





function render(
timestamp,
frame
){



if(frame){


const referenceSpace =
renderer.xr.getReferenceSpace();



const session =
renderer.xr.getSession();




if(!hitTestSourceRequested){



session.requestReferenceSpace(
"viewer"
)

.then(
space=>{


session.requestHitTestSource({

space:space

})

.then(source=>{

hitTestSource=source;

});



});



session.addEventListener(
"end",
()=>{

hitTestSourceRequested=false;

hitTestSource=null;


}
);



hitTestSourceRequested=true;


}





if(hitTestSource){



const hitTestResults =
frame.getHitTestResults(
hitTestSource
);



if(hitTestResults.length){


const hit =
hitTestResults[0];



const pose =
hit.getPose(
referenceSpace
);



reticle.visible=true;


reticle.matrix.fromArray(
pose.transform.matrix
);



}

else{


reticle.visible=false;


}


}



}




renderer.render(
scene,
camera
);


}
