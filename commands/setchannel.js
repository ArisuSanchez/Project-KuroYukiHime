const {
  MessageEmbed
} = require('discord.js')
const db = require("quick.db")
exports.execute = async (client, message, args) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (!args[0]) {
          const embed = new MessageEmbed()
              .addField('!setchannel animes [channel]', 'Set a channel where you would be notified with animes that air! <:remkiss2:853106429887774740>  ')
              .addField('!setchannel feeds [channel]', 'Set a channel where new anime related news would be posted 📰')
          message.channel.send('**`!setchannel` Command**', embed)
      } else if (args[0] === 'animes') {
          let channel = message.channel
          if (!channel) {
              return message.channel.send("Please mention a valid channel where bot has `SEND MESSAGES`, `EMBED LINKS` and `VIEW CHANNEL` Permissions")
          }
          db.set(`animes_${message.guild.id}`, channel.id)
          message.channel.send(new MessageEmbed().setTitle(`⚙ Channel Configuratrion`).setDescription(`Anime Updates Channel has been configured as  ${channel}`))
          channel.send(new MessageEmbed().setTitle(`<a:hora2:853106437676859392> Channel Configuratrion`).setDescription(`I would be posting all anime related updates here!`))
      } else if (args[0] === 'feeds') {
          let newschannel = message.mentions.channels.first()
          if (!newschannel) {
              return message.channel.send("Please mention a valid channel where bot has `SEND MESSAGES`, `EMBED LINKS` and `VIEW CHANNEL` Permissions")
          }
          db.set(`news_${message.guild.id}`, newschannel.id)
          message.channel.send(new MessageEmbed().setTitle(`⚙ Channel Configuratrion`).setDescription(`News/Feeds Updates Channel has been configured as  ${newschannel}`))
          newschannel.send(new MessageEmbed().setTitle(`<a:hora2:853106437676859392> Channel Configuratrion`).setDescription(`I would be posting all anime based news updates here!`))
      } else {
          message.channel.send('You can only use **!setchannel [animes / news]**')
      }
  } else {
      message.channel.send(new MessageEmbed().setTitle(`❌ Permission Errror!`).setDescription(`You must have \`MANAGE_MESSAGES\` permissions within this guild to set a channel!`))
  }
}

exports.help = {
  name: "setchannel",
  aliases: ['sc']
};
