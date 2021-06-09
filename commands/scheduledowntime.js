const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    if (!client.config.developers.includes(message.author.id)) return message.channel.send('You may not schedule a downtime')
    var channel;
    var duration = "";
    var reason = "";
    await message.channel.send(
        "Please mention a channel to announce the downtime"
      );
      await message.channel
        .awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(collected => {
         channel = collected.first().mentions.channels.first()
        });
      await message.channel.send(
        "What would be the reason for the dowtime?"
      );
      await message.channel
        .awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(collectedx => {
         reason = collectedx.first().content;
        });
      await message.channel.send(
        "What would be the duration for the said downtime?"
      );
      message.channel
        .awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(collectedy => {
          duration = collectedy.first().content;
          channel.send(new MessageEmbed() .setTitle('Scheduled Downtime') .addField('Reason:', reason) .addField('At:', duration) .setTimestamp())
          collectedy.first().channel.send(`✔ Scheduled Your Downtime`)
        });
};
exports.help = {
    name: "scheduledowntime",
    aliases: ['sdt']
  };