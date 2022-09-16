const client = require('..');
const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const db = require('quick.db');
const discordTranscripts = require('discord-html-transcripts');
const moment = require('moment');
const config = require("../config.json")

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
  
  let channel = db.fetch(`ticketPanel_${interaction.guildId}`);
  let staff = db.fetch(`staffs_${interaction.guild.id}`);
  let category = db.fetch(`parentCategory_${interaction.guildId}`);

  let Data = db.fetch(`ticketCount_${interaction.guildId}`)
  if(Data == null) Data = 0;
  
  if(interaction.customId === 'buy-ticket') {
    await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true })
    
      const ticket = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: config['buy-id'],
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.cache.get(config['support-role-id']),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      });

    db.add(`ticketCount_${interaction.guildId}`, 1)
    db.set(`ticket-${ticket.id}_${interaction.guild.id}`, {
      user: interaction.user.id,
      closed: false
    })
    await interaction.editReply({ content: `Ticket is aangemaakt ${ticket}`, ephemeral: true })


    const welcomeTicket = new MessageEmbed()
    .setAuthor('Ticket Support', client.user.displayAvatarURL())
    .setDescription('Thank you for contacting support. Please describe your problem and wait for a response. 🔒')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#0473F3')
    const closeButton = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('close-ticket')
      .setLabel('Close')
      .setEmoji('🔒')
      .setStyle('SECONDARY'),
    )
    const welcome = await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} Welcome`, embeds: [welcomeTicket], components: [closeButton] })
  }

  if(interaction.customId === 'queston-ticket') {
    await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true })
    
      const ticket = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: config['question-id'],
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
    await interaction.editReply({ content: `Ticket is aangemaakt ${ticket}`, ephemeral: true })


    const welcomeTicket = new MessageEmbed()
    .setAuthor('Ticket Support', client.user.displayAvatarURL())
    .setDescription('Thank you for contacting support. Please describe your problem and wait for a response.\nTo close this ticket, please click on 🔒')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#0473F3')
    const closeButton = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('close-ticket')
      .setLabel('Close')
      .setEmoji('🔒')
      .setStyle('SECONDARY'),
    )
    const welcome = await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} Welcome`, embeds: [welcomeTicket], components: [closeButton] })
  }

  if(interaction.customId === 'suggestion-ticket') {
    await interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true })
    
      const ticket = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        parent: config['suggestion-id'],
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.cache.get(config['support-role-id']),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
        ],
        type: 'text',
      });

    db.add(`ticketCount_${interaction.guildId}`, 1)
    db.set(`ticket-${ticket.id}_${interaction.guild.id}`, {
      user: interaction.user.id,
      closed: false
    })
    await interaction.editReply({ content: `Ticket is aangemaakt ${ticket}`, ephemeral: true })


    const welcomeTicket = new MessageEmbed()
    .setAuthor('Ticket Support', client.user.displayAvatarURL())
    .setDescription('Thank you for contacting support. Please describe your problem and wait for a response.\nTo close this ticket, please click on 🔒')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#0473F3')
    const closeButton = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('close-ticket')
      .setLabel('Close')
      .setEmoji('🔒')
      .setStyle('SECONDARY'),
    )
    const welcome = await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} Welcome`, embeds: [welcomeTicket], components: [closeButton] })
  }


  if(interaction.customId === 'close-ticket') {
    let closed = db.fetch(`ticket-${interaction.channel.id}_${interaction.guild.id}`)
    if(closed.closed == true) {
      return interaction.reply({ content: `Ticket wordt aangemaakt...`, ephemeral: true })
    }
    const closeTicket = new MessageEmbed()
    .setDescription(`Ticket Closed by ${interaction.user}`)
    .setColor('#0473F3')
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
          {
            id: interaction.guild.roles.cache.get(config['support-role-id']),
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
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


  if(interaction.customId === 'open') {
    let closed = await db.fetch(`ticket-${interaction.channel.id}_${interaction.guild.id}`)

    if(closed.closed == false) {
      return interaction.reply({ content: `Ticket is al heropend...`, ephemeral: true })
    }
    let reopen = new MessageEmbed()
    .setDescription(`Ticket heropend door ${interaction.user}`)
    .setColor('#0473F3')
    interaction.reply({ embeds: [reopen] })
    interaction.channel.permissionOverwrites.edit(closed.user, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
    });
    db.set(`ticket-${interaction.channel.id}_${interaction.guild.id}.closed`, false)
  }


  if(interaction.customId === 'delete') {
    interaction.reply({ embeds: [
      new MessageEmbed()
      .setDescription('Ticket wordt verwijderd in een aantal seconden.')
      .setColor('#0473F3')
    ] });

    setTimeout(() => {
      interaction.channel.delete();
    }, 5000)
    db.delete(`ticket-${interaction.channel.id}_${interaction.guild.id}`)
    
    const transcriptType = await db.fetch(`transcriptType_${interaction.guild.id}`);
    const transcriptChannel = await db.fetch(`ticketTranscript_${interaction.guild.id}`);
    
    if(transcriptType === 'html') {
    const attachment = await discordTranscripts.createTranscript(interaction.channel);
    await client.channels.cache.get(transcriptChannel).send({ embeds: [
      new MessageEmbed()
      .setColor('#0473F3')
      .setDescription(`Ticket \`${interaction.channel.name}\` is gesloten door: **${interaction.user.tag}**.\n Meer informatie over deze actie zie je hier beneden.`)
      .addField("Ticket informatie:", `> Gesloten door: <@${interaction.member.id}> \`(${interaction.user.tag})\``)
      .setAuthor("Ticket gesloten", client.user.displayAvatarURL())
    ]});
    client.channels.cache.get(transcriptChannel).send({ files:[attachment] })
    } else if(transcriptType === 'text') {
        let messages = await interaction.channel.messages.fetch();
        messages = messages.map(m => moment(m.createdTimestamp).format("YYYY-MM-DD hh:mm:ss") +" | "+ m.author.tag + ": " + m.cleanContent).join("\n") || "No messages were in the ticket/Failed logging transcript!";
        const txt = new MessageAttachment(Buffer.from(messages), `transcript_${interaction.channel.id}.txt`)
       client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [txt] })
    } else {
      return;
    }    
  }


  if(interaction.customId === 'transcript') {
    const transcriptType = await db.fetch(`transcriptType_${interaction.guild.id}`);
    const transcriptChannel = await db.fetch(`ticketTranscript_${interaction.guild.id}`);
    if(transcriptType === 'html') {
    const attachment = await discordTranscripts.createTranscript(interaction.channel);
    await client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [attachment] });
        interaction.reply({ embeds: [
          new MessageEmbed()
          .setDescription(`Ticket transcript verzonden naar <#${transcriptChannel}>!`)
          .setColor('#0473F3')
        ] });
    } else if(transcriptType === 'text') {
        let messages = await interaction.channel.messages.fetch();
        messages = messages.map(m => moment(m.createdTimestamp).format("YYYY-MM-DD hh:mm:ss") +" | "+ m.author.tag + ": " + m.cleanContent).join("\n") || "No messages were in the ticket/Failed logging transcript!";
        const txt = new MessageAttachment(Buffer.from(messages), `transcript_${interaction.channel.id}.txt`)
       client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [txt] })
       interaction.reply({ embeds: [
          new MessageEmbed()
          .setDescription(`Ticket transcript verzonden naar <#${transcriptChannel}>!`)
          .setColor('#0473F3')
        ] });
    } else {
      return;
    }

  }
});
