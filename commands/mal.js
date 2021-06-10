const { MessageEmbed } = require('discord.js')
const Scraper = require('mal-scraper')
exports.execute = async (client, message, args) => {
  
  let query = args.join(" ");

  if (!query) return message.channel.send(`Please Give A Search Argument!`);

  if (query.length > 150) return message.channel.send(`Query Lengths Are Limited To 150 Chars`);

  let search = await message.channel.send(`**Searching for the requested anime 🔎**`);

  let dentifier = query.replace(/ /g, " ");

  await search.delete();

  let animedata;

  let Embed;

  try {

  animedata = await Scraper.getInfoFromName(dentifier);

  if (!animedata.genres[0] || animedata.genres[0] === null) animedata.genres[0] = "None";
  Embed = new MessageEmbed()
  .setColor('RANDOM')
  .setURL(animedata.url)
  .setTitle(animedata.title)
  .setDescription(animedata.synopsis)
  .addField(`Type`, animedata.type, true)
  .addField(`Status`, animedata.status, true)
  .addField(`Started Airing`, animedata.premiered, true)
  .addField(`Episodes`, animedata.episodes, true)
  .addField(`Duration`, animedata.duration, true)
  .addField(`Popularity`, animedata.popularity, true)
  .addField(`Genres`, animedata.genres.join(", "))
  .setThumbnail(animedata.picture)
  .setFooter(`Rating - ${animedata.score}/10 | Made by 0_0#6666 and Arisu#0404`)
  .setTimestamp();

  } catch (error) {
    console.log(error)
    return message.channel.send(`No Such Anime Found!`)
   
  };

  return message.channel.send(Embed);
};

exports.help = {
  name: "mal",
  aliases: ['m']};
//im sure i know what i am doing, i hope-a