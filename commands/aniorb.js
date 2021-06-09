//this is for status of aniorb and provides a link to aniorb websites
exports.execute = async (client, message, args) => {
    message.channel.send(`Here is links for aniorb, https://aniorb.me , and to check the status of aniorb https://status.aniorb.me if the service is down expect it to be up soon, beta: https://beta.aniorb.me`)
};
exports.help = {
    name: "aniorb",
    aliases: ['a']
  };