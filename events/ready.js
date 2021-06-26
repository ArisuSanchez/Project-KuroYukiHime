  
module.exports = (client) => {
    client.user.setPresence({ activity: { name: 'Anime And Manga' , type: 'PLAYING', details: 'Listening to !h' }, status: 'dnd', state: 'Busy',  })
    .then(console.log)
    .catch(console.error);
    console.log(`${client.user.tag} is online!\n[Developer Note] Gotta Make sure it launches use !h to test it`);
};