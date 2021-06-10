const { MessageEmbed, DiscordAPIError } = require('discord.js')
const malScraper = require('mal-scraper')
const search = malScraper.search

exports.execute = async (client, message, args) => {
  if(!args) {
    return message.channel.send(`Please provide a search query~~!`)
  }
  const type = 'manga'
  let baseurl = 'https://comick.fun/search?q='
  const dentifier = args.slice().join('%20')
  const url = `${baseurl}` + `${dentifier}`;
  const msg = await message.channel.send(`**🔍 Searching for your manga**`)
search.search(type, {
  maxResults: 1, // how many results at most
  term: args.join(' '), // search term
})
  .then( async mangadata => {
    let manga = new MessageEmbed()
    const desc = mangadata[0].shortDescription.replace("...read more",`...\n**[Read More](${mangadata[0].url})**`)
    manga.setTitle(mangadata[0].title)
	  manga.setDescription(`${desc}\n\n **[Read This Manga For FREE over at our partner Comick™](${url})**`)
	  manga.setThumbnail(mangadata[0].thumbnail)
	  manga.setURL(mangadata[0].url)
	  manga.setColor("RANDOM")

	manga.addFields(
		{ name: "Rating", value: `${mangadata[0].score}/10`, inline: true },
		{ name: "Publishing Started", value: mangadata[0].startDate, inline: true },
		{ name: "Published upto", value: mangadata[0].endDate, inline: true },
		{ name: "Volume Count", value: mangadata[0].vols, inline: true },
		{ name: "Chapter Count", value: mangadata[0].nbChapters, inline: true },
		{ name: "Type", value: mangadata[0].type, inline: true }
	);
  manga.setTimestamp()
  manga.setFooter(`Made by 0_0#6666 and Arisu#0404`)
  await msg.edit(`**🔎 Here are the results we found!**`,manga)
  })
  .catch(console.error)
    }

exports.help = {
  name: "searchmanga",
  aliases: ['sm']
};