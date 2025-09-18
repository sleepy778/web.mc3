import * as server from './server/server.js';
const mineflayer = require('mineflayer');
const armorManager = require('mineflayer-armor-manager');
const autoeat = require('mineflayer-auto-eat');
const pathfinder = require('mineflayer-pathfinder');
const vec3 = require('vec3');
const viewer = require('prismarine-viewer').viewer;

const botOptions = {
    host: 'localhost',
    port: 25565,       
    auth: 'microsoft', 
};
const bot = mineflayer.createBot(botOptions);

bot.loadPlugin(armorManager);
bot.loadPlugin(autoeat);
bot.loadPlugin(pathfinder.pathfinder);

bot.on('login', () => {
    console.log(`Successfully logged in as ${bot.username} on ${bot.server.host}:${bot.server.port}`);
});

bot.on('spawn', () => {
    console.log('Bot has spawned in the game world.');
    viewer.createViewer({
        bot: bot,
        port: 3000,
        viewDistance: 6, // Render blocks up to 6 chunks away
    });
    console.log('Prismarine-Viewer is running. Open http://localhost:3000 in your browser.');
});

bot.on('error', (err) => {
    console.error('An error occurred:', err);
});

bot.on('end', () => {
    console.log('Bot has disconnected from the server.');
});

function movedirection(key, down) {
    if (key === 'w') {
        bot.setControlState('forward', down);}
    else if (key === 's') {
        bot.setControlState('back', down);}
    else if (key === 'a') {
        bot.setControlState('left', down);}
    else if (key === 'd') {
        bot.setControlState('right', down);}
    else if (key === 'space') {
        bot.setControlState('jump', down);}
    else if (key === 'shift') {
        bot.setControlState('sneak', down);}
}