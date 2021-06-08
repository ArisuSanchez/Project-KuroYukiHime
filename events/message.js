module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    let args = message.content.slice(client.prefix.length).trim().split(" ");
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
    if (!command) return;
    command.execute(client, message, args);
};