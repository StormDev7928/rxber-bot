const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('ban a member')
        .addUserOption(user =>
            user.setName('target').setDescription('Target to ban').setRequired(true)
          )
          .addStringOption(type =>
            type.setName('reason').setDescription('Reason for the ban').setRequired(false)
          ),
	async execute(client, interaction) {
        let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Wrong permissions", client.user.displayAvatarURL())
        .setDescription("You don't have the right permissions for that command!")

		if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })

        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "geen reden meegegeven";

        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'You cannot take any action against this user because their role is higher than yours', ephemeral: true});

        let embed = new MessageEmbed()
        .setColor("#0473F3")
        .setAuthor(`Banned user`, client.user.displayAvatarURL())
        .setDescription(`The user **${target.user.tag}** has been successfully banned! \n More information on this campaign can be found below.`)
        .addField("Information input:", `> Banned user: \`${target.user.tag}\` \n > Banned by: <@${interaction.member.id}> \n > Reason: ${reason}`)

        target.ban({reason});

        interaction.reply({ embeds: [embed] })
    }
};
