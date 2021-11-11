class Projectiles {
    constructor(x,y,z,{mat1,mat2,mat3},color,scene)
    {
        this.x = x
        this.y = y
        this.z = z
        this.mat1 = mat1
        this.mat2 = mat2
        this.mat3 = mat3
        this.color = color
        this.scene = scene
    }

    creation(){
        var projectiles = new BABYLON.MeshBuilder.CreateSphere('projectile',{},this.scene)
        var material = new BABYLON.StandardMaterial('projectileMaterial',this.scene)
        material.diffuseColor = new BABYLON.Color3(this.mat1,this.mat2,this.mat3)
        projectiles.projectiles = new BABYLON.Vector3(this.x,this.y,this.z)
    }

    update(){
        this.creation()
    }
}