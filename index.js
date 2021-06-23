const { Client, Collection } = require('discord.js')
const client = new Client();
const fs = require("fs");
client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = client.config.prefix
//  RSS  - Future ( news atm )
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({ skipFirstLoad: true });

feeder.add({
    url: 'https://myanimelist.net/rss/news.xml',
    refresh: 30000,
})

feeder.on('new-item', function (item) {
  try {
    client.guilds.cache.map((guild) => {
      guild.channels.cache.map((c) => {
          let found = 0
        if (found === 0) {
          if (c.name === "feeds") {
            if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
              if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
                c.send(`${item.title}\n ${item.description}`);
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
//i feel like im getting assulted for not knowing what the hell im doing -Au
