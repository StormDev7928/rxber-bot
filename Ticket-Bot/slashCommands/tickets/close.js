const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Sluit de ticket'),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Ontbrekende Permissies", client.user.displayAvatarURL())
        .setDescription("Je hebt geen permissies voor dit commando!")

      if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ embeds: [errorEmbed] })

    let closed = db.fetch(`ticket-${interaction.channel.id}_${interaction.guild.id}`)
    if(closed.closed == true) {
      let errorEmbed2 = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Fout", client.user.displayAvatarURL())
        .setDescription("Deze ticket is al gesloten!")
      return interaction.reply({ embeds: [errorEmbed2] })
    }
    const closeTicket = new MessageEmbed()
    .setColor('#0473F3')
    .setDescription(`Ticket is gesloten door ${interaction.user}`)
    const closeButton = {
        'type': 1,
        'components': [
          {
            'type': 2,
            'style': 'SECONDARY',
            'custom_id': 'open',
            'emoji': '🔓',
            'label': 'Open',
          },
          {
            'type': 2,
            'style': 'SECONDARY',
            'custom_id': 'delete',
            'emoji': '⛔',
            'label': 'Delete',
          },
        ]
      }

    const buttonsMsg = await interaction.reply({ embeds: [closeTicket], components: [closeButton] })
    
      interaction.channel.id, {
        permissionOverwrites: [
          {
            id: interaction.user.id,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
      };

    interaction.channel.permissionOverwrites.edit(closed.user, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
    });

    db.set(`ticket-${interaction.channel.id}_${interaction.guild.id}.closed`, true)
    }
}