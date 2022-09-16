const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-panel')
        .setDescription('Send the ticket panel.'),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Ontbrekende Permissies", client.user.displayAvatarURL())
        .setDescription("Je hebt geen permissies voor dit commando!")

      if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [errorEmbed] })

          let channel = db.get(`ticketPanel_${interaction.guild.id}`);
          let category = db.get(`parentCategory_${interaction.guild.id}`);

          let replyEmbed = new MessageEmbed()
          .setAuthor('Ticket >> Ticket Panel Sent!', interaction.guild.iconURL())
          .setColor("#0473F3")
          .setDescription(`${interaction.user}, ticket panel has been sent to <#${channel}>`)
          interaction.reply({ embeds: [replyEmbed] })

          const embed = new MessageEmbed()
          .setAuthor('Dark Tickets', client.user.displayAvatarURL())
          .setDescription('Click on one of the buttons below to create a ticket. Please read the rules carefully before you submit a ticket. \n \n Our team is always ready to help you.')
          .setFooter(`${client.user.username}©2022`, client.user.displayAvatarURL())
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
          .setColor('#0473F3')
           const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('buy-ticket')
            .setLabel('Buy')
            .setEmoji('💰')
            .setStyle('SECONDARY'),

            new MessageButton()
            .setCustomId('queston-ticket')
            .setLabel('Queston')
            .setEmoji('❓')
            .setStyle('SECONDARY'),

            new MessageButton()
            .setCustomId('suggestion-ticket')
            .setLabel('Suggestion')
            .setEmoji('💼')
            .setStyle('SECONDARY')
          )
          const message = await client.channels.cache.get(channel).send({ embeds: [embed], components: [row] })
    }
}