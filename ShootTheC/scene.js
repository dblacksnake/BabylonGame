const canvas = document.querySelector('.canvas');

var engine = new BABYLON.Engine(canvas,true)


//variables
let scene,light,player,floor = null
var isGravity = true
var force = null


window.addEventListener('click',(event) =>{
    console.log(player.position)
    console.log(player.rotation)
    console.log(event)

    var projectile = new BABYLON.MeshBuilder.CreateSphere('projectiles',{})
    var projMat = new BABYLON.StandardMaterial('material',scene)
    var angleX =Math.atan(event.clientX - player.position.x)
    var angleZ =Math.atan(event.clientY - player.position.z)
    var poX = Math.cos(angleX) * (player.rotation.x +player.position.x)

    projMat.diffuseColor = new BABYLON.Color3(1,0,0)
    projectile.material = projMat
    projectile.position = new BABYLON.Vector3(player.rotation.x * -angleX,player.position.y, Math.atan2(player.position.y,player.position.x))
    //var projectile = new Projectiles(0,10,0,{mat1 = 1,mat2 = 0,mat3 = 0},'red',scene)
    console.log(projectile.position)
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