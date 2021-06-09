const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    let baseurl = 'https://comick.fun/search?q='
    const dentifier = args.slice().join('%20')
    const embed = new MessageEmbed()
    const url = `${baseurl}` + `${dentifier}`;
    embed.setTitle(`🔎 Search Results For Manga, ${args.slice().join(' ')}`)
    embed.setColor('RANDOM')
    embed.setDescription(`**[Click Here To View Your Manga Search Results](${url})**`)
    embed.setTimestamp()
    embed.setFooter(`Made by 0_0#6666 and Arisu#0404`)
    embed.thumbnail('https://onii-chan.life-is-pa.in/7YFbVi.png')
    message.channel.send(`Please Check Your Direct Messages For The Search Results!`)
    message.author.send(embed)
  
}

exports.help = {
  name: "searchmanga",
  aliases: ['sm']
};