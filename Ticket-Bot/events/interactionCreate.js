const { Client, Collection } = require('discord.js');
const client = require('..');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

client.on('interactionCreate', async interaction => {
	let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Fout", client.user.displayAvatarURL())
        .setDescription("Er is een fout opgetreden tijdens het uitvoeren van dit commando.!")

	if (!interaction.isCommand()) return;
	const slashCommand = client.slashCommands.get(interaction.commandName);
	if (!slashCommand) return;
	try {
		await slashCommand.execute(client, interaction);
	} catch (error) {
		if (error) console.error(error);
		await interaction.reply({ embeds: [errorEmbed] });
	}
});