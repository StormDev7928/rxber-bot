const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Display all the commands of this bot.'),
	async execute(client, interaction) {
      let embed = new MessageEmbed()
      .setColor("#0473F3")
      .setTitle(`Informatie over ${client.user.username}`)
      .addField("🤖 Commands",
      `>>> 🛡️ **Admin Commands**: \`/ban\` \`/kick\` \`/clear\` \`/close\` \`/delete\` \`/transcript\` \`/open\`
      🤖 **Slash Commands**: \`/help\` \`/ping\`
      ⚙️ **Set-up commands**: \`/parent-category\` \`/send-channel\` \`/send-panel\` \`/transcript-set\``)
      //.addField("<a:question:912598623366283276> **__How do you use me?__**",
      //`>>> \`!setup\` and react with the Emoji for the right action,
      //but you can also do \`!setup-SYSTEM\` e.g. \`!setup-welcome\``)
      .addField("📈 **Statistieken**",                           
      `>>> 🧑‍🤝‍🧑 **Totaal aantal leden**: \`${client.users.cache.size} leden\`
      📶 **Api Latency**: \`${client.ws.ping}ms\``)
      interaction.reply({ embeds: [embed] });
	}
};