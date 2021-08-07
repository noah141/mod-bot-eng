const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Discord.Collection();

require("dotenv").config();
require("./Handlers/Commands.js")(client);
require("./Handlers/Events.js")(client);


//-----PING---------//
const express = require("express");
 const app = express();

 app.get("/", (req, res) => {
	 res.send("Mod bot Engels is online!");
	
 });

 app.listen(3000, () => {
	 console.log(`Bot online!`);
 });

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Visitor');
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(':wave: Welkom bij RedApps!')
        .setThumbnail("https://cdn.discordapp.com/attachments/871020190845005864/871843711410118656/RedApps.jpg")
        .setDescription(`Welkom <@${guildMember.user.id}>, leuk dat je __**RedApps **__ gejoined bent!.`)
        .addField('👤 __**Members:**__', `Wij hebben nu: **${guildMember.guild.memberCount}** leden!`, true)
        .setFooter("© RedApps™") 
        .setTimestamp()
    guildMember.guild.channels.cache.get('871738870260178996').send(embed)
    guildMember.roles.add(welcomeRole);
});

client.on('guildMemberRemove', guildMember => {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle('REDAPPS LOGGING')
        .setDescription(`Helaas! <@${guildMember.user.id}> heeft zojuist __**RedApps**__ verlaten! ):`)
        .setFooter('© RedApps™')
        .setTimestamp()
    guildMember.guild.channels.cache.get('870682472264908800').send(embed)
});

client.on('message', (message) => { //whenever a message is sent
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link
    message.delete() //delete the message
      .then(message.channel.send('Link deleted:\n**Invite links are not allowed!**'))
  }
})


client.login(process.env.TOKEN);