const canvas = document.querySelector('.canvas');

var engine = new BABYLON.Engine(canvas,true)


//variables
let scene,light,player,floor,poX,poY,poZ,angleX,angleY,angleZ,mesh = null
var isGravity = true
var force = null


window.addEventListener('click',(event) =>{
    console.log("playey position" + player.position)
    console.log("playey rotation" +player.rotation.z)
    console.log("event" + event.position)

    let v0 = new BABYLON.Vector3(0, 0, 1);
    let v1 = 5;
    
    //v1.normalize();
    
    let angle = Math.acos(BABYLON.Vector3.Dot(v0, v1));
    let angleInDegree = BABYLON.Tools.ToDegrees(angle)
    console.log("angleInDegree" + angleInDegree)

    var projectile = new BABYLON.MeshBuilder.CreateSphere('projectiles',{})
    var projMat = new BABYLON.StandardMaterial('material',scene)
   

    projMat.diffuseColor = new BABYLON.Color3(1,0,0)
    projectile.material = projMat
    projectile.position = new BABYLON.Vector3(angleX - (angleX - player.position.x) + 1,angleY * (player.rotation.y - player.position.y),angleY + angleX)
    //var projectile = new Projectiles(0,10,0,{mat1 = 1,mat2 = 0,mat3 = 0},'red',scene)
    console.log("Projectile position" + projectile.position)
    console.log("X in degrees" + BABYLON.Tools.ToDegrees(player.rotation.x))
},false)

//Pointer lock on click !! 
let createPointerLock = function(scene) {
    let canvas = scene.getEngine().getRenderingCanvas();
    canvas.addEventListener("click", event => {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
      if(canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    }, false);
  };
  

var createScene = function() {
    scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3.Black();




    var floor = new BABYLON.Mesh.CreatePlane('floor',100, scene)
    var material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseColor = new BABYLON.Color3.White();
    floor.material = material;
    floor.rotation = new BABYLON.Vector3(1.5,0,0)
    console.log(floor.position)
    floor.position.x = 0
    floor.position.y = 0
    floor.position.z = 0
    

  

    createPointerLock(scene);
    Player()
    Lights()

    return scene;

}


function Lights() {
    light = new BABYLON.PointLight('pointLight',new BABYLON.Vector3(0,0,-10),scene);
    //player = scene.getCameraByName('player')
    light.parent = player;
    light.diffuse = new BABYLON.Color3 (1,1,1)

    fullLight = new BABYLON.DirectionalLight('Light,',new BABYLON.Vector3(0,-10,0),scene)

}


function Player(){
    player = new BABYLON.FreeCamera('player',new BABYLON.Vector3(10,10,-20),scene,true);

    console.log(player.position);
    // console.log(window.mouse.y);
    player.attachControl(canvas,false)
    player.applyGravity = isGravity;
    player.keysUp.push(87)
    player.keysDown.push(83)
    player.keysLeft.push(65)
    player.keysRight.push(68)
    player.keysUpward.push(32)
    // var i = 0
    // while(1< 100){
    //     player.rotation.x === 0
    //     i++
    // } 
}

//Call Method
createScene();

engine.runRenderLoop(() =>{
    angleX =BABYLON.Tools.ToDegrees(player.rotation.y)
    angleZ =BABYLON.Tools.ToDegrees(player.rotation.x * player.rotation.y)
    angleY =BABYLON.Tools.ToDegrees(player.rotation.x)

    poX = Math.cos(angleX) * (player.position.x)
    poZ = Math.cos(angleZ) * (player.position.z)
    poY = Math.cos(angleY) * (player.position.y)
    if(player.rotation.x >= -0.001){
        player.rotation.x == 0
    }
    if(player.position.y  <= 1){
        force =0
    }else{
        force = 0.05;
        player.position.y -= force
    }
    //console.log(player.position)
    // console.log(player.rotation)
    scene.render();
})