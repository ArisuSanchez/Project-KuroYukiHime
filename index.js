const {
  Client,
  Collection,
  MessageEmbed
} = require('discord.js')
const client = new Client();
const fs = require("fs");
const {
  decode
} = require('html-entities');
client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = client.config.prefix
const db = require('quick.db')

//  RSS  - Fully Implimented Notifier
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({
  skipFirstLoad: false
});

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

feeder.on('news', async function(item) {
  let title = decode(item['rss:title']['#'], {
      level: 'xml'
  });
  let permaLink = item['rss:link']['#']
  let description = decode(item['rss:description']['#'], {
      level: 'xml'
  }).replace('...', `**[...Read More](${permaLink})**`)
  let thumbnail = item['media:thumbnail']['#']
  try {
      client.guilds.cache.map((guild) => {
          let chx = db.get(`news_${guild.id}`)
              if (chx === null) {
                  return;
              }
              let c = guild.channels.cache.get(chx)
              if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
                  if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                      let embed = new MessageEmbed()
                          .setTitle(title)
                          .setURL(permaLink)
                          .setDescription(description)
                          .setThumbnail(thumbnail)
                          .setTimestamp()
                      c.send(embed);
                  }
              }
      })
  } catch (err) {
      console.log(err);
  }
})
feeder.on('anime', async function(item) {
  let title = decode(item.title, {
      level: 'xml'
  });
  let permaLink = item.guid
  let thumbnail = item.image.url
  try {
      client.guilds.cache.map((guild) => {
          let chx = db.get(`animes_${guild.id}`)
              if (chx === null) {
                  return;
              }
              let c = guild.channels.cache.get(chx)
              if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
                  if (c.getpermissionsFor(client.user).has("SEND_MESSAGES") === true) {
                      let url = 'https://animek.fun'
                      let embed = new MessageEmbed()
                          .setTitle(title)
                          .setURL(permaLink)
                      embed.setDescription(`**New Episode** of [**__${title}__**](${permaLink}) has aired!\n\n Make Sure To Check It Out On **[AnimeK](${url})**`)
                      embed.setThumbnail(thumbnail)
                      embed.setTimestamp()
                      //embed.setFooter('If Anime Is Not In Recently Added, Wait Up to 24 hours before it is on aniorb servers') //soon to be patched i hope, really annoying tbf
                      c.send(embed);
                  }
              }
      });
  } catch (err) {
      console.log(err);
  }
})
//def need aniorb api so that when an anime releases we can be up to 100x more exact on when it is actually out
feeder.on('error', function(error) {});
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
