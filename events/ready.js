  
module.exports = (client) => {
    client.user.setPresence({ game: { name: 'Anime on Aniorb' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
    console.log(`${client.user.tag} is online!\n[Developer Note] Gotta Make sure it launches use !h to test it`);
};