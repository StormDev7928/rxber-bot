const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('warn a member')
        .addUserOption(user =>
            user.setName('target').setDescription('Target to warn').setRequired(true)
          )
          .addStringOption(type =>
            type.setName('reason').setDescription('reason for the warn').setRequired(true)
          ),
	async execute(client, interaction, args) {
    let errorEmbed = new MessageEmbed()
    .setColor("#fa0505")
    .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
    .setDescription("Je hebt niet de juiste permissie voor die command!")

if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })

      
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "No reason provided";
      
          let warnings = db.get(`warnings_${interaction.guild.id}_${target.id}`);

          let embed = new MessageEmbed()
          .setColor("#0473F3")
          .setAuthor(`Warn gebruiker`, client.user.displayAvatarURL())
          .setDescription(`De gebruiker **${target.user.tag}** is succesvol gewarned! \n Meer informatie over deze actie zie je hier beneden.`)
          .addField("Ingevoerde informatie:", `> Warned gebruiker: \`${target.user.tag}\` \n > Warned door: <@${interaction.member.id}> \n > Reden: ${reason}`)
      
          if (warnings === null) {
            db.set(`warnings_${interaction.guild.id}_${target.id}`, 1);
            await interaction.reply({ embeds: [embed] })
          } else if(warnings !== null) {
            
            db.add(`warnings_${interaction.guild.id}_${target.id}`, 1);
            await interaction.reply({ embeds: [embed] })
            
          }
        }
		
};