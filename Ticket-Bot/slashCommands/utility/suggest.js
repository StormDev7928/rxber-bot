const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Leave a suggestion')
        .addStringOption(type =>
            type.setName('suggestion').setDescription('Suggestie').setRequired(true)
          ),
	async execute(client, interaction) {
        const suggestion = interaction.options.getString('suggestion');

    
                let suggestionEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setAuthor(`${client.user.username} Suggesties`, interaction.member.displayAvatarURL())
                    .addField("Suggestie van:", `<@${interaction.member.id}> (${interaction.user.tag})`)
                    .addField("Suggestie:", suggestion)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
    
                try {
                    
    
                    let channel = client.channels.cache.get(config.suggestion_channel)
                    let suggestionMessage = await channel.send({
                        embeds: [suggestionEmbed]
                    })
    
                    await suggestionMessage.react("✅")
                    await suggestionMessage.react("❌")
    
                } catch (err) {
                    return console.log(err)
                }
    interaction.reply({ content: `Jou suggestie is geplaatst in <#${config.suggestion_channel}>`, ephemeral: true })
}
        
};
