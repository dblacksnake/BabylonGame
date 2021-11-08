const canvas = document.querySelector('.canvas');

var engine = new BABYLON.Engine(canvas,true)


//variables
let scene,light,player = null
var mouseX = null;
var mouseY = null;
    


var createScene = function() {
    scene = new BABYLON.Scene(engine)
    scene.clearColor = new BABYLON.Color3.Black();

    var box = new BABYLON.Mesh.CreateBox('box',4.0, scene)
    var material = new BABYLON.StandardMaterial('material', scene)
    material.diffuseColor = new BABYLON.Color3.Red();
    box.material = material;

    Player()
    Lights()

    return scene;

}


function Lights() {
    light = new BABYLON.PointLight('pointLight',new BABYLON.Vector3(0,0,-10),scene);
    //player = scene.getCameraByName('player')
    light.parent = player;
    light.diffuse = new BABYLON.Color3 (1,1,1)

}


function Player(){
    player = new BABYLON.FreeCamera('player',new BABYLON.Vector3(0,0,-10),scene,true);
    console.log(player);
    player.cameraRotation = new BABYLON.Vector2(mouseX,mouseY)
   
    // console.log(window.mouse.y);
    player.attachControl(canvas,false)
    player.applyGravity = true;
    player.keysUp.push(87)
    player.keysDown.push(83)
    player.keysLeft.push(65)
    player.keysRight.push(68)
    player.keysUpward.push(32)

    
}


//Call Method
createScene();

engine.runRenderLoop(() =>{
    //console.log(canvas.pageX);
    scene.render();
})