game.PlayerEntity = me.Entity.extend({
  init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, settings]);
    this.alwaysUpdate = true;
    this.body.gravity = 0;
    this.movementFrames = 8;
    this.remainingFrames = 0;
    this.maxSpeed = 16 / this.movementFrames;
    this.body.setVelocity(this.maxSpeed, this.maxSpeed);
    this.renderable.translate(0, -8);
    this.bindInputs();
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    this.renderable.addAnimation('walk-up', [0, 1, 2, 1]);
    this.renderable.addAnimation('walk-right', [3, 4, 5, 4]);
    this.renderable.addAnimation('walk-down', [6, 7, 8, 7]);
    this.renderable.addAnimation('face-up', [1]);
    this.renderable.addAnimation('face-right', [4]);
    this.renderable.addAnimation('face-left', [4]);
    this.renderable.addAnimation('face-down', [7]);
    this.renderable.setCurrentAnimation('face-up');
    this.direction = 'up';
    this.moving = false;
  },
  
  bindInputs: function() {
    me.input.bindKey(me.input.KEY.A, 'left');
    me.input.bindKey(me.input.KEY.D, 'right');
    me.input.bindKey(me.input.KEY.W, 'up');
    me.input.bindKey(me.input.KEY.S, 'down');
  },
  
  checkAndAnimate: function(direction) {
    if (!this.moving && me.input.isKeyPressed(direction)) {
      var checkDir = direction == 'left' ? 'right' : direction;
      this.direction = direction;
      if (!this.renderable.isCurrentAnimation('walk-' + checkDir)) {
        this.renderable.setCurrentAnimation('walk-' + checkDir);
      }
      return true;
    }
    return false;
  },
  
  performMovement: function() {
    var vel = { x: 0, y: 0 };
    switch (this.direction) {
    case 'left':
      vel.x = this.maxSpeed * -1;
      break;
    case 'right':
      vel.x = this.maxSpeed;
      break;
    case 'up':
      vel.y = this.maxSpeed * -1;
      break;
    case 'down':
      vel.y = this.maxSpeed;
    }
    return vel;
  },
  
  resetMovement: function() {
    if (!this.moving) {
      this.moving = true;
      this.remainingFrames = this.movementFrames;
    }
  },
  
  update: function(dt) {
    if (this.checkAndAnimate('left')) {
      this.resetMovement();
      this.renderable.flipX(true);
    } else if (this.checkAndAnimate('right')) {
      this.resetMovement();
      this.renderable.flipX(false);
    } else if (this.checkAndAnimate('up')) {
      this.resetMovement();
    } else if (this.checkAndAnimate('down')) {
      this.resetMovement();
    } else if (!this.moving) {
      this.body.vel.x = 0;
      this.body.vel.y = 0;
      this.renderable.setCurrentAnimation('face-' + this.direction);
    }
    if (this.moving) {
      var vel = this.performMovement();
      this.body.vel.x = vel.x;
      this.body.vel.y = vel.y;
      this.remainingFrames --;
      if (this.remainingFrames === 0) {
        this.moving = false;
      }
    }
    this.body.update(dt);
    me.collision.check(this);
    return (
      this._super(me.Entity, 'update', [dt]) ||
      this.body.vel.x !== 0 ||
      this.body.vel.y !== 0
    );
  },
  
  onCollision: function(response, other) {
    return true;
  }
});