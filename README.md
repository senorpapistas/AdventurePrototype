A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Kitchen, Back Alley, Dangerous Street, Dangerous Forest Path, Hot Dog Stand
- **2+ scenes *not* based on `AdventureScene`**: Intro, IntroCut, GoodEnd, BadEnd, Death
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: ominous(object); This method takes in an object, shakes it and gives it a spooky glow; Used for enemies and a door you must not go through
    - Enhancement 2: unwinnablefight(obj_x, obj_y, beast); This method takes in an object and its x, y coordinates to display buttons above its head. This is primarily for the "combat"-check, however, it is more of a item-check; Used for the enemies when interacted with

Experience requirements:
- **4+ locations in the game world**: Kitchen, Back Alley, Dangerous Street, Dangerous Forest Path, Hot Dog Stand
- **2+ interactive objects in most scenes**: Doors and enemies are interactive; You can go through doors and you can attempt to "fight" enemies
- **Many objects have `pointerover` messages**: Moving your cursor over the burger will tell you something; Moving your cursor over the doors will tell you something about them
- **Many objects have `pointerdown` effects**: Clicking on arrows and doors are the primary way of getting around; You can click on enemies to start a special interaction
- **Some objects are themselves animated**: A method was created to give some objects a glow and also allow them to shake; An ally you meet on the Dangerous Street will spin with joy when it enters your party

Asset sources:
- The burger image used is the art for the Yu-Gi-Oh! card Hungry Burger. The image was manually cropped and hue shifted in Photoshop.
- All other image assets were drawn by me in Photoshop.

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.