const { MessageEmbed, DiscordAPIError } = require('discord.js')
const malScraper = require('mal-scraper')
const search = malScraper.search

exports.execute = async (client, message, args) => {
  if(!args) {
    return message.channel.send(`Please provide a search query~~!`)
  }
  const type = 'anime'
  let baseurl = 'https://aniorb.me/search'
  const dentifier = args.slice().join('%20')
  const url = `${baseurl}` + `${dentifier}` + "/1";
  const msg = await message.channel.send(`**🔍 Searching for your anime**`)
search.search(type, {
  maxResults: 1, // how many results at most
  term: args.join(' '), // search term
})
  .then( async animedata => {
    console.log();
    let anime = new MessageEmbed()
    const desc = animedata[0].shortDescription.replace("...read more",`...\n**[Read More](${animedata[0].url})**`)
    anime.setTitle(animedata[0].title)
	  anime.setDescription(`${desc}\n\n **[Watch This Anime On Aniorb](${url})**`)
	  anime.setThumbnail(animedata[0].thumbnail)
	  anime.setURL(animedata[0].url)
	  anime.setColor("RANDOM")

	anime.addFields(
		{ name: "Rating", value: `${animedata[0].score}/10`, inline: true },
		{ name: "Started Airing", value: animedata[0].startDate, inline: true },
		{ name: "Latest Episode", value: animedata[0].endDate, inline: true },
		{ name: "Episodes Count", value: animedata[0].nbEps, inline: true },
    { name: "Rated For", value: animedata[0].rating, inline: true},
		{ name: "Type", value: animedata[0].type, inline: true }
	);
  anime.setTimestamp()
  anime.setFooter(`Made by 0_0#6666 and Arisu#0404`)
  await msg.edit(`**🔎 Here are the results we found!**`,anime)
  })
  .catch(console.error)
    }

exports.help = {
  name: "search",
  aliases: ['s']
};