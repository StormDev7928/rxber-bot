const { Client, Message } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Returns bot ping.',
    run: async(client, message, args) => {

        if(!args[0]) return message.channel.send({ content: "Geef een bericht mee dat de bot moet zeggen." }).catch(e => {});

        message.channel.send({ content: args.join(" ") }).catch(e => {});
    }
}