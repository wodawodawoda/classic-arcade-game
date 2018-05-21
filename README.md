# Classic arcade game project

## Description
Classic frogger game.
## Table of Contents

* [Instructions](#instructions)
* [Dependencies](#dependencies)

## Installation
1. Download dist directory
2. Run index.html in browser

## Instructions
The game starts with three bugs running across the game field. Player starts at the bottom 
of the screen. Player have to reach the water on the other side of the game field and
avoid being touched by bugs during gameplay. When player reaches the water the game ends.

## Dependencies
To run dev or production version you need browser with enabled JavaScript.

## Demo
https://wodawodawoda.github.io/classic-arcade-game/

## Build setup
Project was developed using:
* Webpack 4.6
* ES6
* HTML5
* CSS3
```bash
# To install dev-dependencies, just go to the root folder and run
npm i

# To build production version run
npm run build

# To build dev version run
npm run dev

# To run on webpcak-server run
npm run start
```
## Files to review
* /src/js/app.js contains gameplay code
* /src/js/engine.js contains game engine code
* /src/js/resources.js contains code utilities
* /src/css/style.css contains all game styles
* /src/index.html contains basic HTML game template

/dist contains dev version of Memory game for presentation purpouse
