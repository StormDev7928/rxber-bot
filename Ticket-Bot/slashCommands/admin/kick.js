const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member')
        .addUserOption(user =>
            user.setName('target').setDescription('Target to kick').setRequired(true)
          )
          .addStringOption(type =>
            type.setName('reason').setDescription('reason for the kick').setRequired(false)
          ),
	async execute(client, interaction) {
        let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
        .setDescription("You don't have the right permissions for that command!")

		if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "No reason provided";

        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'You cant take action on this user as their role is higher than yours', ephemeral: true});

        let embed = new MessageEmbed()
        .setColor("#0473F3")
        .setAuthor(`Gerbuiker gekicked`, client.user.displayAvatarURL())
        .setDescription(`The user **${target.user.tag}** has been successfully kicked! \More information about this action can be found below.`)
        .addField("Information input:", `> Kicked User: \`${target.user.tag}\` \n > Kicked By: <@${interaction.member.id}> \n > Reason: ${reason}`)
        
        target.kick(reason);

        interaction.reply({ embeds: [embed] })
    }
};
