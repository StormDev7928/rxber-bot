const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, version } = require('discord.js');
let os = require("os");
const config = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Display all the information of this bot.'),
	async execute(client, interaction) {
        const ToTalSeconds = (client.uptime / 1000);
        const Minutes = Math.floor(ToTalSeconds / 60);
        const Seconds = Math.floor(ToTalSeconds % 60);
        const Uptime = `${Minutes} Mins, ${Seconds} Secs`;
        const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const RamUsed = Math.round(process.cpuUsage().system) / 1024;
        let embed = new MessageEmbed()
            .setColor("#0473F3")
            .setTitle(`Informatie over ${client.user.username}`)
            .addField("🤖 Algemene Informaite",
            `>>> ⚙️ **Totaal aantal servers**: \`${client.guilds.cache.size} Servers\`
            📜 **Totaal aantal kanalen**: \`${client.channels.cache.size} kanalen\`
            🧑‍🤝‍🧑 **Totaal aantal leden**: \`${client.users.cache.size} leden\``)
            .addField("📈 **Statistieken**",                           
            `>>> ⌚ **Uptime**: \`${Uptime}\`
            🤖 **Node**: \`${process.version}\`
            👾 **Discord.js**: \`v${version}\`
            🤖 **CPU Usage**: \`${Math.trunc(RamUsed) / 100}%\`
            ⏳ **Memory Usage**: \`${Math.trunc(MemoryUsage)} / 16000 MB \`
            🤖 **ARCH**: \`${os.arch()}\`
            💻 **Platform**: \`${os.platform}\`
            🤖 **CPU**: \`${os.cpus().map((i) => `${i.model}`)[0]}\`
            📶 **Api Latency**: \`${client.ws.ping}ms\``)             
      interaction.reply({ embeds: [embed] });
	}
};