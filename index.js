const { Client, Collection } = require('discord.js')
const client = new Client();
const fs = require("fs");
client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = client.config.prefix
//  RSS  - Future
const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({ skipFirstLoad: true });

feeder.add({
    url: 'https://example/com/rss',
    refresh: 30000,
});

feeder.on('new-item', function (item) {
    client.guilds.forEach(g => 
        g.channels.cache.get(c => c.name == 'feeds').send(item))
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