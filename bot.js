const Discord = require('discord.js')
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require("fs")
bot.commands = new Discord.Collection();
const config = require('./config.json');
const ms = require("ms")

bot.on('ready', () => {
    console.log('Bot is online');
    bot.user.setActivity('.help', { type: 'WATCHING'}).catch(console.error);

    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');

        if(jsfile.length == 0) {return console.log("Could not any commands")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help, props)
        })
    })
})

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded!`);
      bot.commands.set(props.help, props);
    });
  });
bot.login(config.token)