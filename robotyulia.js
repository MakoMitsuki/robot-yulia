require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var schedule = require('node-schedule');
var isOdd = true; //july27

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);

  raidScheduler();
});

bot.on('message', msg => {
  if (msg.content === '!are you here') {
    msg.reply("yeah dw I'm here");
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
  wedcron.minute = 30;
  var w = schedule.scheduleJob(wedcron, function(){
    console.log('Wednesday');
    bot.channels.get('559799847499202570').send(`**<@&710866300506996787> Reminder: We have raid today in half an hour!!**`).catch(console.error);
  });

  // friday cron
  var wedcron = new schedule.RecurrenceRule();
  wedcron.dayOfWeek = 5;
  wedcron.hour = 14;
  wedcron.minute = 30;
  var w = schedule.scheduleJob(wedcron, function(){
    bot.channels.get('559799847499202570').send(`**<@&710866300506996787> Reminder: We have raid today in half an hour!!**`).catch(console.error);
    console.log('Friday');
  });

  // monday cron every other monday
  var moncron = new schedule.RecurrenceRule();
  moncron.dayOfWeek = 1;
  moncron.hour = 13;
  moncron.minute = 0;
  var m = schedule.scheduleJob(moncron, function(){
    isOdd = !isOdd;
    if (isOdd){
      console.log('Monday');
      bot.channels.get('559799847499202570').send(`**<@&710866300506996787> Reminder: We have raid today in half an hour!!**`).catch(console.error);
    }
    else {
      console.log('Monday no raid');
    }
  });
}


