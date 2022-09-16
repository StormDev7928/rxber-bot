const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transcript-set')
        .setDescription('Set the channel to send transcript & the type of transcript')
        .addChannelOption(channel =>
          channel.setName('channel').setDescription('Transcript channel')
        )
        .addStringOption(type =>
          type.setName('type-of-transcript').setDescription('html or text transcript')
          .addChoice('html', 'html').addChoice('text', 'text')
        ),
    async execute(client, interaction) {
      let errorEmbed = new MessageEmbed()
      .setColor("#fa0505")
      .setAuthor("Wrong permissions", client.user.displayAvatarURL())
      .setDescription("You dont have the right perms!")
  
      if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [errorEmbed] })
      const channel = interaction.options.getChannel('channel');
      const type = interaction.options.getString('type-of-transcript');

      let channelEmbed = new MessageEmbed()
      .setColor('#0473F3')
      .setAuthor('Setup >> Ticket Transcript Settings', interaction.guild.iconURL())
      .setDescription(`${interaction.user}, You have successfully set up the channel for sending ticket transcripts to ${channel} and the type of transcript is ${type}`)
      db.set(`ticketTranscript_${interaction.guild.id}`, channel.id)
      db.set(`transcriptType_${interaction.guild.id}`, type)
      interaction.reply({ embeds: [channelEmbed] })
    }
}