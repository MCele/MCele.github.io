/**
 * Comportamiento que sigue Seek en x al lider
 *
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} lider
 * @returns {Behavior_ArribarAlPunto}
 */
function Behavior_ArribarAlPunto(game, posx, posy, key, frame, lider) {
    Behavior.call(this, game, posx, posy, key, frame, lider);
    //this.sprite.body.collideWorldBounds =false;
    this.vecReference = new Phaser.Point(0, 0);
    
    this.sentido=1;
    this.max_speed = 250;
    this.max_force=4;
    this.min_speed = 0;
    this.min_distance = 40;
    this.max_distance = 150;//inicia el AREA de arribo

    this.sprite.scale.setTo(0.5,0.5);
    this.sprite.animations.add('volar', [0, 1, 2, 3, 4, 5, 6, 7], 6, true);
    //this.sprite.enableBody=true;
    return this;
}

//subclase de Sprite
Behavior_ArribarAlPunto.prototype = Object.create(Behavior.prototype); 
Behavior_ArribarAlPunto.prototype.constructor = Behavior_ArribarAlPunto;

Behavior_ArribarAlPunto.prototype.update = function () {
    this.arribar();
};

Behavior_ArribarAlPunto.prototype.arribar=function(punto){
    //Obtener velocidad deseada
    var vectorDeseado;
    vectorDeseado = this.calcularVelocidadDeseada(punto);
    //Obtener el vector de fuerza
    var vectorSteeringForce;
    vectorSteeringForce = this.calcularSteeringForce(vectorDeseado);
    //aplico el vector de fuerza al this.sprite
    this.aplicarVectorDeFuerza(vectorSteeringForce);
  //  this.sprite.rotation = vecReference.angle(this.sprite.body.velocity);
}

Behavior_ArribarAlPunto.prototype.calcularVelocidadDeseada=function (punto) {
    // Calculo el vector deseado = normalizado(POSICION lider - POSICION this.sprite) * maximaVelocidad
    var distancia=game.physics.arcade.distanceBetween(punto,this.sprite);
    var angle = this.angleBetween(punto);
    var vectorDeseado;
    if(distancia<this.max_distance){
        //reducir velocidad
        vectorDeseado = ((Phaser.Point.subtract(punto, this.sprite.position)).normalize()).multiply(distancia, distancia);
    }else{
        vectorDeseado = ((Phaser.Point.subtract(punto, this.sprite.position)).normalize()).multiply(this.max_speed, this.max_speed);
    }
    return vectorDeseado;
}

Behavior_ArribarAlPunto.prototype.calcularSteeringForce=function(vectorDeseado){
    //Calculo el vector de fueza = vector deseado - velocidad actual del this.sprite
    var vectorSteeringForce;
    vectorSteeringForce = Phaser.Point.subtract(vectorDeseado, this.sprite.body.velocity);
    if (vectorSteeringForce.getMagnitudeSq() > (this.max_force*this.max_force)){
        vectorSteeringForce.setMagnitude(this.max_force);
    }
    return vectorSteeringForce;
}

Behavior_ArribarAlPunto.prototype.aplicarVectorDeFuerza=function(vectorSteeringForce) {
    //Calculo la nueva velocidad y posicion del this.sprite sumando la posicion con el vector de fuerza
    this.sprite.body.velocity.add(vectorSteeringForce.x, vectorSteeringForce.y);
    //si la velocidad nueva es mayor a la maxima velocidad determinada, se deja la maxima.
    if (this.sprite.body.velocity.getMagnitudeSq() > (this.max_speed * this.max_speed)) {
        this.sprite.body.velocity.setMagnitude(this.sentido*this.max_speed);
    }
}

Behavior_ArribarAlPunto.prototype.angleBetween=function(punto) {
    var dx = punto.x - this.sprite.x;
    var dy = punto.y - this.sprite.y;
    return Math.atan2(dy, dx);
}
