// Provides simple bot facts
const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    MessageEmbed.setTitle("This Bot Was Created And Managed by: Arisu#0404 and 0_0#6666")
    MessageEmbed.setcolor('#13c2cf')
    MessageEmbed.setDescription('The verified status of this bot is: ❌Unverified')
    MessageEmbed.setThumbnail('https://arisubot-me.shx.gg/54E7_xMct.png')
    MessageEmbed.setFooter('I am a good bot')
};
exports.help = {
    name: "botfacts",
    aliases: ['bf']
  };