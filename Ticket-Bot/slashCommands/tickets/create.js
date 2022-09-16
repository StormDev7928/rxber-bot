const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Maak een nieuwe ticket'),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Ontbrekende Permissies", client.user.displayAvatarURL())
        .setDescription("Je hebt geen permissies voor dit commando!")

      if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ embeds: [errorEmbed] })

      let category = db.fetch(`parentCategory_${interaction.guildId}`);
    
      let Data = db.fetch(`ticketCount_${interaction.guildId}`)
      if(Data == null) Data = 0;
    
        await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true })
        
          const ticket = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            parent: category,
            permissionOverwrites: [
              {
                id: interaction.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
              },
              {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
              },
            ],
            type: 'text',
          });
    
        db.add(`ticketCount_${interaction.guildId}`, 1)
        db.set(`ticket-${ticket.id}_${interaction.guild.id}`, {
          user: interaction.user.id,
          closed: false
        })
        await interaction.editReply({ content: `Ticket aangemaakt ${ticket}`, ephemeral: true })
    
    
        const welcomeTicket = new MessageEmbed()
        .setColor('#0473F3')
        .setAuthor('Ticket Support', client.user.displayAvatarURL())
        .setDescription('Het support team reageert zo spoedig mogelijk.\nWil je deze ticket sluiten klik dan op 🔒')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        const closeButton = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('close-ticket')
          .setLabel('Close')
          .setEmoji('🔒')
          .setStyle('SECONDARY'),
        )
        const welcome = await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} Welkom`, embeds: [welcomeTicket], components: [closeButton] })
    }
}