const {Message} = require('discord.js')
exports.execute = async (client, message, args) => {
    message.channel.send(`There will be downtime at 9:00 Pacific Standard Time on 6/8/2021 `)
};
exports.help = {
    name: "downtime",
    aliases: ['d']
  };