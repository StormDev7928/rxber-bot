const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-channel')
        .setDescription('Set the channel for sending the ticket panel')
        .addChannelOption(channel =>
          channel.setName('channel').setDescription('Ticket panel channel')
        ),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
      .setColor("#fa0505")
      .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
      .setDescription("You don't have the right permissions for that command!")
  
      if(!interaction.member.permissions.has('ADMINISRATOR')) return interaction.reply({ embeds: [errorEmbed] })
      let channel = interaction.options.getChannel('channel')

      let channelEmbed = new MessageEmbed()
      .setAuthor('Setup >> Ticket Panel Channel', interaction.guild.iconURL())
      .setColor('#0473F3')
      .setDescription(`${interaction.user}, you have successfully set the ticket panel to ${channel}`)
      db.set(`ticketPanel_${interaction.guild.id}`, channel.id)
      interaction.reply({ embeds: [channelEmbed] })
    }
}