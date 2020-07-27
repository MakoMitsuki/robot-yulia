require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var schedule = require('node-schedule');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  var months
  raidScheduler();
});

bot.on('message', msg => {
  if (msg.content === '!are you here') {
    msg.reply("yeah I'm here");
    msg.channel.send('ur mom');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});

function raidScheduler() {
  // wednesday cron
  var wedcron = new schedule.RecurrenceRule();
  wedcron.dayOfWeek = 3;
  wedcron.hour = 13;
  wedcron.minute = 0;
  var w = schedule.scheduleJob(wedcron, function(){
    console.log('Wednesday');
  });

  // friday cron
  var wedcron = new schedule.RecurrenceRule();
  wedcron.dayOfWeek = 5;
  wedcron.hour = 14;
  wedcron.minute = 0;
  var w = schedule.scheduleJob(wedcron, function(){
    console.log('Friday');
  });

  // monday cron
  var m = schedule.scheduleJob('0 13 * * 1 [ `expr \`date +\%s\` / 86400 \% 2` -eq 1 ] &&', function(){
    console.log('Monday');
  });
}