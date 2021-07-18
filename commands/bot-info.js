// Provides simple bot facts
const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed()
    embed.setTitle("This Bot Was Created And Managed by: Arisu#0404 and 0_0#6666")
    embed.setColor('RANDOM')
    embed.setDescription('The verified status of this bot is: ❌Unverified')
    embed.setThumbnail('https://arisubot-me.shx.gg/54E7_xMct.png')
    embed.setFooter('I am a good bot')
    message.channel.send(embed)
};
exports.help = {
    name: "botfacts",
    aliases: ['bf']
  };