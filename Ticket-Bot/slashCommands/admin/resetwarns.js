const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetwarn')
		.setDescription('Verwijder alle warns van een gebruiker')
        .addUserOption(user =>
            user.setName('target').setDescription('Target to clean').setRequired(true)
          )
          .addStringOption(type =>
            type.setName('reason').setDescription('reden om de warns te resetten').setRequired(true)
          ),
	async execute(client, interaction, args) {
    let errorEmbed = new MessageEmbed()
    .setColor("#fa0505")
    .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
    .setDescription("Je hetb niet de juiste permissie voor die command!")

    if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })

      
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "Geen reden meegegeven";
        
        let warnings = db.get(`warnings_${interaction.guild.id}_${target.id}`);

  if (warnings === null) {
    let errorEmbed2 = new MessageEmbed()
    .setColor("#fa0505")
    .setAuthor("Error", client.user.displayAvatarURL())
    .setDescription(`${target.user.username} heeft geen warns!`)

    return interaction.reply({ embeds: [errorEmbed2] })
  }

  let embed = new MessageEmbed()
    .setColor("#0473F3")
    .setAuthor(`Warns gereset`, client.user.displayAvatarURL())
    .setDescription(`De warns van **${target.user.tag}** zijn succesvol gereset! \n Meer informatie over deze actie zie je hier beneden.`)
    .addField("Ingevoerde informatie:", `> Reseted gebruiker: \`${target.user.tag}\` \n > Reseted door: <@${interaction.member.id}> \n > Reden: ${reason}`)

  db.delete(`warnings_${interaction.guild.id}_${target.id}`);
  await interaction.reply({ embeds: [embed] })
}
		
};