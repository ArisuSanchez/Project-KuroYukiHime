const { MessageEmbed } = require('discord.js')
exports.execute = async (client, message, args) => {
    let baseurl = 'https://aniorb.me/search/'
    const dentifier = args.slice().join('%20')
    const embed = new MessageEmbed()
    const url = `${baseurl}` + `${dentifier}` + `/1`;
    embed.setTitle(`🔎 Search Results For ${args.slice().join(' ')}`)
    embed.setColor('RANDOM')
    embed.setDescription(`**[Here Is What You Wanted](${url})**`)
    embed.setTimestamp()
    embed.setFooter(`Made With ❤ by 0_0#6666`)
    message.channel.send(`💌 Please Check Our Direct Messages!`)
    message.author.send(embed)
  
};

exports.help = {
  name: "search",
  aliases: ['s']
};