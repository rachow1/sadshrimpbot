

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILD_VOICE_STATES", "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });
const config = require('./config');

const prefix = '-';
const hey = 'hey travis';
var isAlmighty = false;
var connection;
var hesitate = 0;
var iniativeOrder = [];
const fs = require('fs');
const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus, getVoiceConnection } = require('./node_modules/@discordjs/voice/dist/index');
const { Console } = require('console');
const { array } = require('./node_modules/zod/lib/types');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

function checkCommands(message) {

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift();

    if (command === 'ping') {
        return message.channel.send('pong!');
    }
    else if (command === 'roll') {

        const dice = message.content.slice(5).replace(/\s+/g, '');

        const callback = client.commands.get('roll').execute(dice);
        if (callback) return message.channel.send(callback);

    }
    else if (command === 'join') {

        const callback = client.commands.get('join').execute(message, true);
        if (callback) return message.channel.send(callback);

    }
    else if (command === 'leave') {

        const callback = client.commands.get('join').execute(message, false);
        if (callback) message.channel.send(callback);

    }
}


client.on('messageCreate', async message => {
    if (message.author.bot) return;

    const words = message.content.toLowerCase();
    const channel = message.channel;
    var responses = [];

    if (words.startsWith(prefix)) return checkCommands(message);

    if (words.includes('almighty shrimp')) {
        isAlmighty = !isAlmighty;
        channel.send(client.commands.get('almighty').execute(isAlmighty));
    }

    //i want to see my little boy still has to happen in this method
    if (words.includes('i want to see my little boy')) {

        if (voiceChannel = message.member.voice.channel) {
            client.commands.get('join').execute(message, true);
            return channel.send('here he comes');
        }
    }

    //check for a valid response
    var found = client.commands.get('readMessage').execute(words)
    if (found.length > 0) responses = found;
    //or check for high five or his name
    else if (words.includes('high five')) message.react('✋');
    else if (words.includes('travis')) {
        message.react('771042294639755294');
    }

    //check for saved responses
    if (responses.length === 0) return;

    //send response(s);
    while (responses.length >= 1) {

        var response = responses.shift();
        if (isAlmighty) response = '\*\*' + response + '\*\*';

        channel.send(response);
        await new Promise(res => setTimeout(res, 500 * hesitate + 1200));
        hesitate++;
    }
    hesitate = 0;
});



client.once('ready', () => {
    console.log('Here comes the boyyyy')
});

client.login(config.BOT_TOKEN);