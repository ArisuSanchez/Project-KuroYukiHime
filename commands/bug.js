exports.execute = async (client, message, args) => {
    console.log(args)
let reason = args.join(" ")
let { MessageEmbed } = require("discord.js")
let embed = new MessageEmbed()
.setTitle("Bug Report")
.setDescription(reason)
.setColor('#e60017')
.setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
const ClientGuild = message.guild.channels.cache.find(c => c.name == "bugs") 
const OurGuild = client.guilds.cache.get("851929571988471890").channels.cache.get("852452228052156416")
OurGuild.send(embed)
message.channel.send('Report Submitted!')
if(!ClientGuild) return
ClientGuild.send(embed)
message.channel.send('Report Submitted!')
}


exports.help = {
    name: "bug",
    aliases: ['b']
  };