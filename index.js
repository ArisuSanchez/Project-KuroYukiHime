const { Client, Collection, MessageEmbed } = require('discord.js')
const client = new Client();
const fs = require("fs");
const { decode } = require('html-entities');
client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = client.config.prefix

//  RSS  - Fully Implimented Notifier
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({ skipFirstLoad: false });

feeder.add({
    url: 'https://myanimelist.net/rss/news.xml',
    refresh: 30000,
    eventName: 'news'
})
feeder.add({
  url: 'https://www.livechart.me/feeds/episodes',
  refresh: 30000,
  eventName: 'anime'
})

feeder.on('news', async function (item) {
  let title = decode( item['rss:title']['#'] , {level: 'xml'});
  let permaLink = item['rss:link']['#']
  let description = decode( item['rss:description']['#'] , {level: 'xml'}).replace('...',`**[...Read More](${permaLink})**`)
  let thumbnail = item['media:thumbnail']['#']
  try {
    client.guilds.cache.map((guild) => {
      guild.channels.cache.map((c) => {
          let found = 0
        if (found === 0) {
          if (c.name === "feeds") {
            if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                let embed = new MessageEmbed()
                .setTitle(title)
                .setURL(permaLink)
                .setDescription(description)
                .setThumbnail(thumbnail)
                .setTimestamp()
                c.send(embed);
                found = 1
              }
            }
          }
        }
      });
    });
  }
  catch (err) {
    console.log(err);
  }
})
feeder.on('anime', async function (item) {
  let title = decode( item.title , {level: 'xml'});
  let permaLink = item.guid
  let baseurl = 'https://aniorb.me/recentlyadded/1'
  //let stuff = item.title.replace('');
  //const dentifier = stuff.replace(' ','')
  const url = `${baseurl}`;
  let thumbnail = item.image.url
  try {
    client.guilds.cache.map((guild) => {
      guild.channels.cache.map((c) => {
          let found = 0
        if (found === 0) {
          if (c.name === "animes") {
            if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                let embed = new MessageEmbed()
                .setTitle(title)
                .setURL(permaLink)
                  embed.setDescription(`**New Episode** of [**__${title}__**](${permaLink}) has aired!\n\n Make Sure To Check It Out On **[Aniorb](${url})**`)
                embed.setThumbnail(thumbnail)
                embed.setTimestamp()
                embed.setFooter('*If Anime Is Not In Recently Added, Wait One Hour Before Its On Aniorb Servers*')//soon to be patched i hope, really annoying tbf
                c.send(embed);
                found = 1

              }
            }
          }
        }
      });
    });
  }
  catch (err) {
    console.log(err);
  }
})

feeder.on('error', function (error) {
});
// END

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        const event = require(`./events/${f}`);
        let eventName = f.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
}); // that is a simple event handler, now we are organized 👀-0

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
        command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
    });
}); // simple command handler MoRe ORgAnIzEd 👀-0
client.login(client.config.token);

// url test function - thanks stackoverflow
//removed
//i feel like im getting assulted for not knowing what the hell im doing -Au

//**holy fuck i deleted that shit but whatever, ill get this shit setup i hope -au*/