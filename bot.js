const winston = require('winston');
// Configure logger settings
const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
    ]
});

const fs = require('fs')

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    logger.info(`Got message: ${msg}`)
    if (msg.content === '!ping') {
        msg.reply('pong');
    }
});

// get token from file
fs.readFile('./auth.json', 'utf-8', (err, jsonString)=>{
    const data = JSON.parse(jsonString);
    client.login(data.token)
})
