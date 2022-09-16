const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnings')
		.setDescription('Check the total warnings of an user')
        .addUserOption(user =>
            user.setName('target').setDescription('Target to check').setRequired(true)
          ),
	async execute(client, interaction, args) {
      
        const target = interaction.options.getMember('target');
    
        let warnings = db.get(`warnings_${interaction.guild.id}_${target.id}`);
    
        if (warnings === null) warnings = 0;

        let embed = new MessageEmbed()
          .setColor("#0473F3")
          .setAuthor(`Warnings check`, client.user.displayAvatarURL())
          .setDescription(`De gebruiker **${target.user.tag}** heeft **${warnings}** warning(s)`)
          .addField("Ingevoerde informaite", `> Gebruiker: \`${target.user.tag}\` \n > Checked door: <@${interaction.member.id}> \n > Totaal aantal warning(s): ${warnings}`)
    
        interaction.reply({ embeds: [embed] })
      }
		
};