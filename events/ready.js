  
module.exports = (client) => {
    client.user.setPresence({ activity: { name: 'Anime And Manga| !h for help' , type: 'PLAYING', }, status: 'dnd', state: 'Busy',  })
    .then(console.log)
    .catch(console.error);
    console.log(`${client.user.tag} is online!\n[Developer Note] Gotta Make sure it launches use !h to test it`);
};