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

client.on('message', msg => {
    logger.info(`Got message: ${msg}`)
    if (msg.content === '!ping') {
        msg.reply('pong');
    }
});

client.on('message', msg => {
    guild = client.get_guild(ID)
    memberList = guild.members
    logger.info(`Got message: ${msg}`)
    if (msg.content === '!list') {
        msg.reply(`Hello ${memberList}`);
    }
});

client.login(auth.token)
