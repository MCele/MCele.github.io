/**
 * Clase Comportamiento
 * @param {Phaser.Game} game referencia al juego
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} lider
 * @returns {Behavior}
 */

function Behavior(game, posx, posy, key, frame, lider) {
    //crea referencia a sprite
    this.sprite = game.add.sprite(posx, posy, key);
    this.lider = lider;
    this.game = game;
    this.game.physics.arcade.enable(this.sprite);
    this.esp_speed = 0;
    this.max_speed = 1.5;
    this.min_speed = 0;
    this.min_distance = 0;
    this.max_distance = 0;
    return this;
}

Behavior.prototype.constructor = Behavior;
/**
 * Metodo abstracto que deben reescribir en clase hijo
 * @returns {undefined}
 */

Behavior.prototype.update = function () {

};
