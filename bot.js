const winston = require('winston');
const Discord = require('discord.js');
const fetch = require('node-fetch');
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
        msg.channel.send(':rotating_light: :rotating_light: :rotating_light:');
    }
});

// money bags
client.on('message', msg => {
    if (msg.content === '!money') {
        msg.channel.send(':moneybag: :moneybag: :moneybag:');
    }
});

// Check everyday to see if there is a game and send message to channel
const checkSchedule = async () => {
    try {
      const habsGame = "https://statsapi.web.nhl.com/api/v1/schedule?teamId=8";
      const response = await fetch(habsGame);
      const schedule = await response.json();
      if (schedule.totalGames === 1) {
        client.channels.cache
          .get(`798939751075282977`)
          .send(
            `There is a game today!! \n Home team: ${schedule.dates[0].games[0].teams.home.team.name} \n Visiting team: ${schedule.dates[0].games[0].teams.away.team.name}`
          );
      }
    } catch (err) {
      console.log({ err });
    }
  }

//GOAL BOT

/*
  client.on('ready', () => {
    checkSchedule();
});
*/
client.on('message', msg => {
    if (msg.content === 'game?') {
        checkSchedule();
    }
});

//other random stuff
client.on('message', msg => {
    if (msg.content === '!hello') {
        msg.channel.send(`Hello ${msg.guild.name}`);
    }
});

client.on('message', msg => {
    let memberList = msg.channel.members.array();
    if (msg.content === '!list') {
        msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}\nMembers: ${memberList}`);
    }
});

client.login(auth.token)
