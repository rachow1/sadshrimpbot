const { joinVoiceChannel } = require('@discordjs/voice');
const { VoiceConnectionStatus, getVoiceConnection } = require('../node_modules/@discordjs/voice/dist/index')

var connection;

module.exports = {
    name: 'join',
    description: 'joins the vc',
    execute(message, joinState) {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return 'but you\'re not in a voice channel';

        if (joinState) {
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            return 'here i am my dudes :sunglasses:';
        }
        else {
            if (!connection) return;
            else {
                connection.destroy();
                connection = null;
                return 'ok :(';
            }
        }

    }
}