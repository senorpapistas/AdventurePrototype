class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    create() {
        this.add.text(50, 50, "\n\nClick anywhere to begin.").setFontSize(40);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('introcut'));
        });
    }
}

class IntroCut extends Phaser.Scene {
    constructor() {
        super('introcut');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('bg', 'background.png');
        this.load.image('chef', 'chef.png');
        this.load.image('counter', 'counter.png');
        this.load.image('burger', 'bruger.png');
    }
    create() {
        let bg = this.add.image(960, 540, 'bg');
        bg.setScale(2.7);
        let chef = this.add.image(960, 540, 'chef');
        chef.setScale(2.7);
        let counter = this.add.image(960, 540, 'counter');
        counter.setScale(2.7);
        let burger = this.add.image(1400, -600, 'burger'); // drops to 600
        burger.setScale(1.2);
        let progress_text = this.add.text(1150, 300, 'Click to continue', {fontSize: '50px', color: '#000000'});
        progress_text.alpha = 0;
        this.tweens.chain({
            tweens: [
                {targets: burger, y: 600, ease: 'Bounce.easeOut', duration: 1500},
                {targets: chef, x: 3000, duration: 3000},
                {targets: burger, scaleX: -1, duration: 100},
                {targets: chef, x: 3001, duration: 1000},
                {targets: burger, scaleX: 1, duration: 100},
                {targets: chef, x: 3000, duration: 1000},
                {targets: burger, x: -200, ease: 'Linear', duration: 700},
                {targets: progress_text, alpha: 1, duration: 500}
            ]
        });
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('room1'));
        });
    }
}

class Kitchen extends AdventureScene {
    constructor() {
        super('room1', 'Kitchen');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('table', 'table.png');
        //this.load.image('burger', 'bruger.png');
        this.load.image('counter_td', 'counter_topdown.png');
        this.load.image('backdoor', 'backdoor.png');
        this.load.image('doomdoor', 'doomdoor.png');
    }
    onEnter() {
        let table_check = 2;
        let counter_td = this.add.image(400, 600, 'counter_td')
            .setScale(-1.5)
        let table = this.add.image(190, 250, 'table')
            .setScale(-.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There seems to be some loot");
            })
            .on('pointerdown', () => {
                if (table_check == 2) {this.showMessage("You find a cheeseburger-sized hammer");
                this.gainItem('cheeseburger-sized hammer'); table_check--;}
                else if (table_check == 1) {this.showMessage("You find a stale french fry");
                this.gainItem('stale french fry'); table_check--; table.removeInteractive();}
                ;
            });
        let backdoor = this.add.image(1200, 150, 'backdoor')
            .setScale(.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It seems to be the way out");
            })
            .on('pointerdown', () => {
                if (this.hasItem('cheeseburger-sized hammer')) {
                    this.showMessage('You break your way out');
                    this.loseItem('cheeseburger-sized hammer');
                    this.gotoScene('room2');
                } else {
                    this.showMessage("The door won't budge");
                }
            });
        let check = 1;
        let doomdoor = this.add.image(300, 900, 'doomdoor')
            .setScale(.9)
            .setInteractive()
            .on('pointerover', () => {
                if (check == 1) {this.ominous(doomdoor); check--};
            })
            .on('pointerdown', () => {
                this.showMessage('There is something ominous about that door, it might be better to not enter')
            })
        let burger = this.add.image(700, 570, 'burger')
            .setScale(.3)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("That's you");
            });
    }
}

class BackAlley extends AdventureScene {
    constructor() {
        super('room2', 'Back Alley');
    }
    preload() {
        this.load.path = './assets/';
        //this.load.image('burger', 'bruger.png');
        this.load.image('vanquisher', 'vanquisher.png');
        this.load.image('arrow', 'arrow.png');
        this.load.image('yes', 'yes.png');
        this.load.image('no', 'no.png');
    }
    onEnter() {
        let check = 1;
        let burger = this.add.image(700, 900, 'burger')
            .setScale(.4);
        let vanquisher = this.add.image(700, 400, 'vanquisher')
            .setScale(.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('This beast is truly the gluten gobbler')
                if (check == 1) {this.ominous(vanquisher); check--};
            })
            .on('pointerdown', () => {
                this.unwinnablefight(700, 400, vanquisher);
                vanquisher.removeInteractive();
            });
        let left = this.add.image(150, 600, 'arrow')
            .setScale(.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('One of 2 ways you can go. This path leads to a dangerous looking street');
            })
            .on('pointerdown', () => {
                this.tweens.add({targets: burger, x: -500, duration: 1000})
                this.gotoScene('room3a');
            });
        let right = this.add.image(1300, 600, 'arrow')
            .setScale(-.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('One of 2 ways you can go. This path leads to a dangerous looking forest path');
            })
            .on('pointerdown', () => {
                this.tweens.add({targets: burger, scaleX: -.4, duration: 50})
                this.tweens.add({targets: burger, alpha: 0, x: 1600, duration: 1000})
                this.gotoScene('room3b');
            });
        }
}

class DangerousStreet extends AdventureScene {
    constructor() {
        super('room3a', 'Dangerous Street');
    }
    preload() {
        this.load.path = './assets/';
        //this.load.image('burger', 'bruger.png');
        //this.load.image('arrow', 'arrow.png');
        this.load.image('moomoo', 'tubby.png');
        //this.load.image('yes', 'yes.png');
        //this.load.image('no', 'no.png');
        this.load.image('traffic', 'traffic.png');
    }
    onEnter() {
        let burger = this.add.image(1200, 900, 'burger')
            .setScale(.5);
        let friend = false;
        let moomoo = this.add.image(1100, 500, 'moomoo')
            .setScale(.7)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('a miniature organism')
            })
            .on('pointerdown', () => {
                if (friend == false) {
                    this.showMessage('You feel a beautiful connection with this organic being, as if you might be related. Would you like to befriend it?')
                    let yes = this.add.image(1000, 300, 'yes')
                        .setScale(.4)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.gainItem('Ally: moomoo')
                            this.tweens.add({targets: moomoo, angle: 360, duration: 1000})
                            this.tweens.add({targets: [yes, no], alpha: 0, duration: 1000})
                            yes.removeInteractive();
                            no.removeInteractive();
                            friend = true;
                        })
                    let no = this.add.image(1200, 300, 'no')
                        .setScale(.4)
                        .setInteractive()
                        .on('pointerdown', () => {
                            this.showMessage('How sad')
                            this.tweens.add({targets: [yes, no, moomoo], alpha: 0, duration: 1000})
                            yes.removeInteractive();
                            no.removeInteractive();
                        })
                } else {
                    this.tweens.add({targets: moomoo, angle: 360, duration: 1000})
                }
            });
        let traffic = this.add.image(200, 100, 'traffic')
            .setScale(1.3)
            .setAngle(-30)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('you will get smushed');
            })
            .on('pointerdown', () => {
                this.showMessage('you got trampled');
                this.gotoScene('death');
            });
        let arrow = this.add.image(300, 850, 'arrow')
            .setScale(1)
            .setAngle(-30)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('It looks like the path to glory and honor')
            })
            .on('pointerdown', () => {
                this.showMessage('You venture forth')
                this.gotoScene('room4')
            });
    }
}

class DangerousForestPath extends AdventureScene {
    constructor() {
        super('room3b', 'Dangerous Forest Path');
    }
    preload() {
        this.load.path = './assets/';
        //this.load.image('burger', 'bruger.png');
        //this.load.image('arrow', 'arrow.png');
        //this.load.image('yes', 'yes.png');
        //this.load.image('no', 'no.png');
        this.load.image('soldier', 'soldierofchaos.png');
    }
    onEnter() {
        let check1 = 1;
        let check2 = 1; 
        let check3 = 1;

        let burger = this.add.image(200, 900, 'burger')
            .setScale(.4)
            this.tweens.add({targets:burger, scaleX: -.4, duration: 0});
        let soldier1 = this.add.image(280, 270, 'soldier')
            .setScale(.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("soldier of the ancient one's army")
                if (check1 == 1) {this.ominous(soldier1); check1--};
            })
            .on('pointerdown', () => {
                this.unwinnablefight(300, 300, soldier1);
                soldier1.removeInteractive();
            });
        let soldier2 = this.add.image(650, 500, 'soldier')
            .setScale(.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("soldier of the ancient one's army")
                if (check2 == 1) {this.ominous(soldier2); check2--};
            })
            .on('pointerdown', () => {
                this.unwinnablefight(670, 530, soldier2);
                soldier2.removeInteractive();
            });
        let soldier3 = this.add.image(1150, 270, 'soldier')
            .setScale(.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("soldier of the ancient one's army")
                if (check3 == 1) {this.ominous(soldier3); check3--};
            })
            .on('pointerdown', () => {
                this.unwinnablefight(1170, 300, soldier3);
                soldier3.removeInteractive();
            });
        let arrow = this.add.image(1100, 850, 'arrow')
            .setScale(1)
            .setAngle(-150)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('It looks like the path to honor and glory')
            })
            .on('pointerdown', () => {
                this.showMessage('You venture forth')
                this.gotoScene('room4')
            });
    }
}

class HotDogStand extends AdventureScene {
    constructor() {
        super('room4', 'Hot Dog Stand')
    }
    preload() {
        this.load.path = './assets/';
        //this.load.image('burger', 'bruger.png');
        this.load.image('hotdogstand', 'hotdogstand.png');
        this.load.image('hotdogbrother', 'longlostbrother.png');
        this.load.image('endoftime', 'backdoor.png');
    }
    onEnter() {
        let burger = this.add.image(650, 900, 'burger') 
            .setScale(.4)
        let hotdogstand = this.add.image(720, 300, 'hotdogstand')
            .setScale(2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('A stand of massive proportions');
            })
            .on('pointerdown', () => {
                this.showMessage('Something falls from the stand');
                this.tweens.add({targets: hotdogbrother, x:300, y: 700, duration: 2500, ease: 'Bounce.easeOut'});
                hotdogstand.removeInteractive();
            });
            this.tweens.add({targets: hotdogstand, scaleY: 1.5, duration: 0});
        let hotdogbrother = this.add.image(500, -700, 'hotdogbrother') // falls to x, y = 300, 700
            .setScale(.4)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('Who is that? They look so familiar...');
            })
            .on('pointerdown', () => {
                this.showMessage('You have finally found your long lost brother!');
                this.gainItem('Ally: brethren');
                this.tweens.add({targets: hotdogbrother, scaleX: -.4, duration: 300});
                let endofspace = endoftime.postFX.addGlow(0xffffff, 0, 0, false, 0.1, 32);
                this.tweens.add({targets: endofspace, outerStrength: 7, yoyo: true, duration: 1750, ease: 'sine.inout'});
                this.tweens.add({targets: endoftime, alpha: 1, duration: 1000});
                let hotdogwater = hotdogbrother.postFX.addGlow(0xffffff, 0, 0, false, 0.1, 32);
                this.tweens.add({targets: hotdogwater, outerStrength: 7, yoyo: true, duration: 1750, ease: 'sine.inout'});
                this.tweens.add({targets: hotdogbrother, x: '+=100', duration: 1000});
                hotdogbrother.removeInteractive();
            });
        let endoftime = this.add.image(1200, 830, 'endoftime')
            .setScale(.8)
            .setAlpha(0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('The end of time');
            })
            .on('pointerdown', () => {
                if (this.hasItem('Ally: moomoo')) {
                    this.showMessage('GOOD END');
                    this.gotoScene('goodend');
                } else {
                    this.showMessage('BAD END');
                    this.gotoScene('badend');
                }
            })
    }
}

class GoodEnd extends Phaser.Scene {
    constructor() {
        super('goodend')
    }
    preload() {
        //this.load.path = './assets/';
        //this.load.image('moomoo', 'tubby.png');
        //this.load.image('hotdogbrother', 'longlostbrother.png');
        //this.load.image('burger', 'bruger.png');
    }
    create() {
        let burger = this.add.image(1300, 300, 'burger')
            .setScale(1);
        let moomoo = this.add.image(1600, 650, 'moomoo')
            .setScale(1);
        let hotdogbrother = this.add.image(1100, 800, 'hotdogbrother')
            .setScale(1);
        this.add.text(400, 400, 'GOOD END', {fontSize: '80px', color: '#00ff00'});
        this.add.text(405, 500, "\n\nClick to restart", {fontSize: '40px'});
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class BadEnd extends Phaser.Scene {
    constructor() {
        super('badend')
    }
    preload() {
        //this.load.path = './assets/';
        //this.load.image('vanquisher', 'vanquisher.png');
    }
    create() {
        let vanquisher = this.add.image(1200, 700, 'vanquisher')
            .setScale(2.5);
        this.add.text(400, 400, 'BAD END', {fontSize: '80px', color: '#ff0000'});
        this.add.text(380, 500, "\n\nClick to restart", {fontSize: '40px'});
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class Death extends Phaser.Scene {
    constructor() {
        super('death')
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('soldierofchaos', 'soldierofchaos.png');
    }
    create() {
        let vanquisher = this.add.image(1400, 700, 'soldierofchaos')
            .setScale(2);
        this.add.text(300, 400, 'YOU ARE DEAD', {fontSize: '80px', color: '#ffff00'});
        this.add.text(380, 500, "\n\nClick to restart", {fontSize: '40px'});
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

const game = new Phaser.Game({
    scale: {
        type: Phaser.WEBGL,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Intro, IntroCut, Kitchen, BackAlley, DangerousStreet, DangerousForestPath, HotDogStand, GoodEnd, BadEnd, Death],
    title: "BurgVenture"
})