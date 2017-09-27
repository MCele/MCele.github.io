/**
 * 
 *
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} lider
 * @returns {Behavior_Derecho}
 */

function Behavior_FormacionV(game, posx, posy, key, frame, lider,id) {
    Behavior_ArribarAlPunto.call(this, game, posx, posy, key, frame, lider);
    this.distancia_lider = 50;
    //this.tv = new Phaser.Point();
    this.behind = new Phaser.Point();
    this.id = id;
    return this;
}
Behavior_FormacionV.prototype = Object.create(Behavior_ArribarAlPunto.prototype);//Defino que es sub clase de Behavior.
Behavior_FormacionV.prototype.constructor = Behavior_FormacionV;

Behavior_FormacionV.prototype.update = function () {
    this.sprite.animations.play('volar');
    //si la distancia al lider es menor la mínimo estalecido, entonces deben evadir
    if (game.physics.arcade.distanceBetween(this.lider,this.sprite) < this.min_distance){
	if(this.id%2==0)m=100;
	else m=-100;
	this.behind = new Phaser.Point(this.sprite.body.x,this.sprite.body.y+m);
    } else {
        this.behind = this.formacionV(this.id,this.behind);
    }
    this.arribar(this.behind);

    this.sprite.angle = this.lider.angle;
}


Behavior_FormacionV.prototype.formacionV= function(id, behind){
    var angulo2 = 315 + this.lider.angle;
    var angulo1 = 45 + this.lider.angle;
    var anguloNuevo = angulo1;
    if (id % 2 === 0) {
        anguloNuevo = angulo1;
    } else {
        anguloNuevo = angulo2;
    }
    var x = this.lider.body.x + (this.distancia_lider * (Math.floor(id/2)+1)* Math.cos((anguloNuevo * Math.PI) / 180));
    var y = this.lider.body.y + (this.distancia_lider * (Math.floor(id/2)+1)* Math.sin((anguloNuevo * Math.PI) / 180));
    this.sprite.body.angularVelocity = this.lider.body.angularVelocity;
    p=new Phaser.Point(x, y);
    return p;
};
