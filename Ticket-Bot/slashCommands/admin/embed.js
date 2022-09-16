const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v9');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Say a message with the bot')
    .addStringOption((option) =>
    option.setName('message').setDescription('The message to say').setRequired(true)
    ),
    async execute(client, interaction) {
        let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
        .setDescription("You don't have the right permissions for that command!")

		if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })
        let embed = new MessageEmbed()
        .setColor("#0473F3")
        .setDescription(interaction.options.getString('message'))
        interaction.reply({ embeds: [embed] });
    }
}