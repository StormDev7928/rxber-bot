const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('parent-category')
        .setDescription('Set the parent category of ticket channels')
        .addChannelOption(category =>
          category.setName('category').setDescription('Ticket categorie')
        ),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
      .setColor("#fa0505")
      .setAuthor("Wrong permissions", client.user.displayAvatarURL())
      .setDescription("You don't have the right permissions for that command!")
  
      if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [errorEmbed] })

          let category = interaction.options.getChannel('category')

          let categoryEmbed = new MessageEmbed()
          .setAuthor('Setup >> Ticket category', interaction.guild.iconURL())
          .setColor('#0473F3')
          .setDescription(`${interaction.user}, you have successfully set the ticket category to ${category}`)
          db.set(`parentCategory_${interaction.guild.id}`, category.id)
          interaction.reply({ embeds: [categoryEmbed] })
    }
}