const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Bulk delete messages')
        .addIntegerOption((option) => {
            return option
            .setName('amount')
            .setDescription('amount of message to delete')
            .setRequired(true)
        }),
	async execute(client, interaction) {
		let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Wrong permissions", client.user.displayAvatarURL())
        .setDescription("You don't have the right permissions for that command!")

		if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })

        let amount = interaction.options.getInteger('amount')

        if(isNaN(amount)) {
            return interaction.reply({ content: "Please specify a valid amount between 1 - 100!", ephemeral: true})
        }
        if(parseInt(amount) > 99) {
            return interaction.reply({ content: "Choose a number lower than 99!", ephemeral: true})
        } else {
            try {
                let { size } = await interaction.channel.bulkDelete(amount)
                await interaction.reply({ content:`deleted ${size} messages`, ephemeral: true})
            } catch(e) {
                console.log(e)
                return interaction.reply({ content: `I cannot delete messages that is older than 14 days`, ephemeral: true})
            }
        }
    }
};
