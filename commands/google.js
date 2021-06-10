const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    let baseurl = 'https://www.google.com/search?q='
    const dentifier = args.slice().join('+')
    const embed = new MessageEmbed()
    const url = `${baseurl}` + `${dentifier}`;
    embed.setTitle(`🔎Google Search Results For, ${args.slice().join(' ')}`)
    embed.setColor('RANDOM')
    embed.setDescription(`**[Click Here To Open Your Google Search Results](${url})**`)
    embed.setTimestamp()
    embed.setThumbnail('https://onii-chan.life-is-pa.in/mMKgss.png')
    embed.setFooter(`Made by 0_0#6666 and Arisu#0404`)
    message.channel.send(embed)
  
};

exports.help = {
  name: "searchgoogle",
  aliases: ['sg']
};