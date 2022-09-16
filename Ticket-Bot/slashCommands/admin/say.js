const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say a message with the bot')
    .addStringOption((option) =>
    option.setName('message').setDescription('The message to say').setRequired(true)
    ),
    async execute(client, interaction) {
        let errorEmbed = new MessageEmbed()
        .setColor("#fa0505")
        .setAuthor("Verkeerde permissies", client.user.displayAvatarURL())
        .setDescription("Je hebt niet de juiste permissie voor die command!")

		if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ embeds: [errorEmbed] })

        interaction.reply({ content: interaction.options.getString('message'), ephemeral: false })
    }
}