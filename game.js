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
        this.load.image('burger', 'bruger.png');
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
        this.load.image('burger', 'bruger.png');
        this.load.image('vanquisher', 'vanquisher.png');
        this.load.image('arrow', 'arrow.png');
        this.load.image('yes', 'yes.png');
        this.load.image('no', 'no.png');
    }
    onEnter() {
        let check = 1;
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
                this.gotoScene('room3a');
            });
        let right = this.add.image(1300, 600, 'arrow')
            .setScale(-.5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('One of 2 ways you can go. This path leads to a dangerous looking forest path');
            })
            .on('pointerdown', () => {
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
        this.load.image('burger', 'bruger.png');
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
    scene: [/*Intro, IntroCut,*/ Kitchen, BackAlley],
    title: "burgventure"
})