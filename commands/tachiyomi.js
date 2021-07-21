const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed ()
embed.setTitle ('What Is tachiyomi?')
embed.setFooter ('Created By Arisu#0404')
embed.setThumbnail('https://github.com/tachiyomiorg/tachiyomi/blob/master/.github/readme-images/app-icon.png?raw=true')
embed.setDescription('Tachiyomi is a free and open source manga reader for Android 6.0 and above Join https://discord.gg/tachiyomi, or go to https://tachiyomi.org/. for more information, help, and support')
embed.setColor('#2e84bf')
message.channel.send(embed)

};

exports.help = {
    name: "Tachiyomi",
    aliases: ['t']
};