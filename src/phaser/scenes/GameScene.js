import Phaser from 'phaser';
import EmojiText from '../objects/EmojiText';

const STIFFNESS = 1;

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('game-scene');
  }

  preload () {
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/shinyball.png');
    this.load.image('apple', 'https://labs.phaser.io/assets/sprites/apple.png');
    this.load.image('block', 'https://labs.phaser.io/assets/sprites/block.png');
  }
  
  create () {
    this.matter.world.setBounds();
    
    //🎩🧢👒
    this.ball = new EmojiText(this, 100, 100, { text:'⚽',size: 60, matterBodyConfig: { mass: 1, restitution: 1.1, friction: 0, airFriction: 0, Intertia: Infinity } });
    this.hat = new EmojiText(this, 100, 100, { text:'🎩',size: 80, matterBodyConfig: { mass: 0, shape: { type: 'rectangle', width: 60, height: 40 } } });
    this.h = new EmojiText(this, 100, 100, { text:'😄',size: 80, matterBodyConfig: { mass:0 } });
    this.b = new EmojiText(this, 100, 100, { text:'👕',size: 110, matterBodyConfig: { mass: 0, shape: { type: 'rectangle', width: 60, height: 80 } } });
    this.s = new EmojiText(this, 100, 100, { text:'🩳',size: 80, matterBodyConfig: { mass: 0, shape: { type: 'rectangle', width: 80, height: 40 } } });
    this.l = new EmojiText(this, 100, 100, { text:'💪',size: 70, matterBodyConfig: { mass: 0 } });
    this.r = new EmojiText(this, 100, 100, { text:'💪',size: 70, matterBodyConfig: { mass: 0 }});
    this.a = new EmojiText(this, 100, 100, { text:'🖕',size: 40, matterBodyConfig: { mass: 1 }});
    this.w = new EmojiText(this, 100, 100, { text:'🦵',size: 100, matterBodyConfig: { mass: 10, shape: { type: 'rectangle', width: 70, height: 80 } } });
    this.e = new EmojiText(this, 100, 100, { text:'🦵',size: 100, matterBodyConfig: { mass: 10, shape: { type: 'rectangle', width: 70, height: 80 } } });
    
    this.hat.text.setDepth(4);
    this.h.text.setDepth(3);
    this.b.text.setDepth(2);
    this.s.text.setDepth(1);

    this.s.text.setOrigin(0.5, 0.2);

    this.r.text.setFlipX(true);
    this.e.text.setFlipX(true);
    
    // head+hat connection
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.hat.gameObject.body,
      bodyB: this.h.gameObject.body,
      pointA: { x: 0, y: 20 },
      pointB: { x: 0, y: -40 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // neck
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.b.gameObject.body,
      bodyB: this.h.gameObject.body,
      pointA: { x: 0, y: -50 },
      pointB: { x: 0, y: 30 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // left armpit
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.b.gameObject.body,
      bodyB: this.l.gameObject.body,
      pointA: { x: -40, y: -15 },
      pointB: { x: 20, y: 20 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // right armpit
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.b.gameObject.body,
      bodyB: this.r.gameObject.body,
      pointA: { x: 40, y: -15 },
      pointB: { x: -20, y: 20 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // left wrist
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.l.gameObject.body,
      bodyB: this.a.gameObject.body,
      pointA: { x: -30, y: -30 },
      pointB: { x: 0, y: 20 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // waist
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.b.gameObject.body,
      bodyB: this.s.gameObject.body,
      pointA: { x: 0, y: 40 },
      pointB: { x: 0, y: -20 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // left hip
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.s.gameObject.body,
      bodyB: this.w.gameObject.body,
      pointA: { x: -30, y: 20 },
      pointB: { x: 30, y: -40 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    // right hip
    var constraint = Phaser.Physics.Matter.Matter.Constraint.create({
      bodyA: this.s.gameObject.body,
      bodyB: this.e.gameObject.body,
      pointA: { x: 30, y: 20 },
      pointB: { x: -30, y: -40 },
      length: 0,
      stiffness: STIFFNESS,
    });
    this.matter.world.add(constraint);

    this.matter.add.mouseSpring();

    this.cursors = this.input.keyboard.createCursorKeys();

    setInterval(() =>  this.h.gameObject.setVelocityY(-100), 1_000);
  }

  update() {
    this.a.update();
    this.b.update();

    if (this.cursors.left.isDown) this.h.gameObject.setVelocityX(-10);
    if (this.cursors.right.isDown) this.h.gameObject.setVelocityX(10);

    if (this.cursors.up.isDown) this.h.gameObject.setVelocityY(-20);
    else if (this.cursors.down.isDown) this.h.gameObject.setVelocityY(10);
  }
}
