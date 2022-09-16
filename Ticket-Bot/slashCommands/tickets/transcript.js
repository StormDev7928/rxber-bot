const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const db = require('quick.db');
const discordTranscripts = require('discord-html-transcripts');
const moment = require('moment');
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transcript')
        .setDescription('Send the ticket transcript'),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Ontbrekende Permissies", client.user.displayAvatarURL())
        .setDescription("Je hebt geen permissies voor dit commando!")

      if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ embeds: [errorEmbed] })
      const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('transcript-bericht')
            .setLabel('Receive the transcript')
            .setStyle('SECONDARY')
          )
      const transcriptType = await db.fetch(`transcriptType_${interaction.guild.id}`);
      const transcriptChannel = await db.fetch(`ticketTranscript_${interaction.guild.id}`);
      if(transcriptType === 'html') {
      const attachment = await discordTranscripts.createTranscript(interaction.channel);
      await client.channels.cache.get(transcriptChannel).send({ embeds: [
        new MessageEmbed()
        .setColor('#0473F3')
        .setDescription(`Ticket \`${interaction.channel.name}\` is gesloten door: **${interaction.user.tag}**.\n Meer informatie over deze actie zie je hier beneden.`)
        .addField("Ticket Informatie:", `> Gesloten door: <@${interaction.member.id}> \`(${interaction.user.tag})\``)
        .setAuthor("Ticket gesloten", client.user.displayAvatarURL())
      ], files: [attachment], components: [row] });
        interaction.reply({ embeds: [
            new MessageEmbed()
            .setColor('#0473F3')
            .setDescription(`Ticket transcript verzonden naar <#${transcriptChannel}>!`)
          ] });
      } else if(transcriptType === 'text') {
          let messages = await interaction.channel.messages.fetch();
          messages = messages.map(m => moment(m.createdTimestamp).format("YYYY-MM-DD hh:mm:ss") +" | "+ m.author.tag + ": " + m.cleanContent).join("\n") || "No messages were in the ticket/Failed logging transcript!";
          const txt = new MessageAttachment(Buffer.from(messages), `transcript_${interaction.channel.id}.txt`)
         client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [txt] })
         interaction.reply({ embeds: [
            new MessageEmbed()
            .setColor('#0473F3')
            .setDescription(`Ticket transcript verzonden naar <#${transcriptChannel}>!`)
          ] });
      } else {
        let errorEmbed2 = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Fout", client.user.displayAvatarURL())
        .setDescription("Deze server heeft nog geen kanaal ingesteld waar het transcript naar verzonden moet worden.")
        return interaction.reply({ embeds: [errorEmbed2] })      }

      if(interaction.customId === 'transcript-bericht') {
        return interaction.reply({ content: 'Hoi Hoi', files: [attachment], ephemeral: true })
      }

    }
}