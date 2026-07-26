import * as THREE from "../../libs/three.module.js";

import { ARButton } 
from "../../libs/ARButton.js";



let scene;

let camera;

let renderer;



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



renderer.setSize(

window.innerWidth,

window.innerHeight

);



renderer.xr.enabled=true;



document.body.appendChild(
renderer.domElement
);





// tombol START AR

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



document.getElementById("status")
.innerHTML =
"Klik START AR";



}






function animate(){


renderer.setAnimationLoop(()=>{


renderer.render(
scene,
camera
);


});


}