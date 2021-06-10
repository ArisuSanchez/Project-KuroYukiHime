const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    let baseurl = 'https://myanimelist.net/search/all?q='
    const dentifier = args.slice().join('%20')
    const embed = new MessageEmbed()
    const url = `${baseurl}` + `${dentifier}` + `&cat=all`;
    embed.setTitle(`🔎 Search Results For My Anime List, ${args.slice().join(' ')}`)
    embed.setColor('RANDOM')
    embed.setDescription(`**[Click Here To Open Your My Anime List Search Results](${url})**`)
    embed.setTimestamp()
    embed.setThumbnail('https://onii-chan.life-is-pa.in/7YFbVi.png')
    embed.setFooter(`Made by 0_0#6666 and Arisu#0404`)
    message.channel.send(embed)
  
};

exports.help = {
  name: "mal",
  aliases: ['m']};
//im sure i know what i am doing, i hope-a