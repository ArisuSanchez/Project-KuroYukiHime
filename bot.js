console.log('I launched you fucking dumbass, what now?')

const Discord = require('discord.js');
const client = new Discord.Client();
client.login("ODUxNTU4NTAwNzU1OTYzOTY2.YL6Bpw.xyYRVS8cXxZZmE1PtymcQgDaf5c");

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('cum for me i suppose you stupid bitch')
}
client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === 'search sailor moon'){
        msg.reply('https://aniorb.me/search/sailor%20moon/1');

    }
    if (msg.content === 'based'){
        msg.reply ('based, based on what <:squint:834828052092682270>');
    }
    if (msg.content === 'google'){
        msg.reply('https://google.com');
    } 
    if (msg.content === )
}
