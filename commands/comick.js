//links and status check of comick
exports.execute = async (client, message, args) => {
    message.channel.send(`Here are links for comick, https://comick.fun to check status of comick https://comick.statuspage.io`)
};
exports.help = {
    name: "comick",
    aliases: ['c']
  };
  //need to replace with mangadex api and see what happens ~a