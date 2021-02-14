const winston = require('winston');
const Discord = require('discord.js');
var auth = require('./auth.json');
var nodeCleanup = require('node-cleanup');

// Configure logger settings
const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
    ]
});

const client = new Discord.Client();

nodeCleanup(function (exitCode, signal) {
    logger.info("Exiting")
    client.destroy()
});

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
    client.user.setPresence({
        game: { 
            name: 'Habs',
            type: 'WATCHING'
        },
        status: 'online'
    })
})

client.on('message', msg => {
    logger.info(`Got message: ${msg}`)
    if (msg.content === '!ping') {
        msg.reply('pong');
    }
});

// goal sirens
client.on('message', msg => {
    if (msg.content === '!goal') {
        msg.reply('Yes! :rotating_light: :rotating_light: :rotating_light:');
    }
});

// money bags
client.on('message', msg => {
    if (msg.content === '!money') {
        msg.reply("That's right :moneybag: :moneybag: :moneybag:");
    }
});


client.on('message', msg => {
    if (msg.content === '!list') {
        msg.reply(`Hello ${msg.guild.name}`);
    }
});

client.login(auth.token)
