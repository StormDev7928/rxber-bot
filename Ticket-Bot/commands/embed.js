const { Client, Message } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Returns bot ping.',
    run: async(client, message, args) => {   
        if(!args[0]) return message.channel.send({ content: "Geef een bericht mee voor de bot." }).catch(e => {});
    
        let embed = new MessageEmbed()
        .setColor("#0473F3")
        .setDescription(args.join(" "))
        message.channel.send({ embeds: [embed] }).catch(e => {});
    }
}