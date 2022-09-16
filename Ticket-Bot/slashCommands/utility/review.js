const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('review')
		.setDescription('Leave a review')
        .addStringOption(type =>
            type.setName('stars').setDescription('Number of stars (1-5)').setRequired(true)
        )
        .addStringOption(type =>
            type.setName('review').setDescription('Review').setRequired(true)
          ),
	async execute(client, interaction) {
        const review = interaction.options.getString('review');

        const amountStars = interaction.options.getString('stars');

        var stars = "";

        for (var i = 0; i< amountStars; i++) {

            stars += ":star:"
        }


    
                let reviewEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setAuthor(`${client.user.username} Reviews`, interaction.member.displayAvatarURL())
                    .addField("Review of:", `<@${interaction.member.id}> (${interaction.user.tag})`)
                    .addField("Stars:", `${stars}`)
                    .addField("Review:", review)
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))    
    
                try {
                    
    
                    let channel = client.channels.cache.get(config.review_channel)
                    await channel.send({
                        embeds: [reviewEmbed]
                    })
    
                } catch (err) {
                    return console.log(err)
                }
    interaction.reply({ content: `Your review has been posted in <#${config.review_channel}>`, ephemeral: true })
}
        
};
