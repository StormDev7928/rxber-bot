const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the Avatar of an user')
    .addUserOption(user =>
        user.setName('user').setDescription('Target to see avatar').setRequired(false)
      ),
    async execute(client, interaction, cmduser, es, ls, prefix, player, message) {
        const target = interaction.options.getMember('user') || interaction.member;

        const png = target.user.displayAvatarURL({ dynamic: false, format: 'png' });
        const jpg = target.user.displayAvatarURL({ dynamic: false, format: 'jpg' });
        const webp = target.user.displayAvatarURL({ dynamic: false, format: 'webp' });
        const gif = target.user.displayAvatarURL({ dynamic: true });
        // const bmp = member.user.displayAvatarURL({ dynamic: false, format: 'bitmap' });

        const avatarMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu({
                placeholder: 'Choose the image size',
                customId: 'main',
                options: [
                    {
                        label: '128 pixels',
                        value: "Option 1",
                        emoji: '🖼️',
                    },
                    {
                        label: '256 pixels',
                        value: "Option 2",
                        emoji: '🖼️',
                    },
                    {
                        label: '[Original] 1024 pixels',
                        value: "Option 0",
                        emoji: '🖼️',
                    },
                ]
            }),
        );

        const avtEmbed = new MessageEmbed()
            .setColor('#0473F3')
            .setTitle('Size : 1024px')
            .setImage(target.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
            .setDescription(`Download Avatar image ass:\n**[png](${png}) | [jpg](${jpg}) | [gif](${gif}) | [webp](${webp})**` || `**[png](${png}) | [jpg](${jpg})**`)

        interaction.reply({ content: 'Avatar ' + target.user.tag })
        let avt = await interaction.channel.send({ embeds: [avtEmbed], components: [avatarMenu] })

        const filter = async interaction => {

            if (interaction.user.id !== interaction.member.id) {
                interaction.reply({
                    content: "<:AAcross_box:864690410232610836> Dit is niet jou bericht",
                    ephemeral: true
                });
                return false;
            };
            return true;
        }

        const collector = avt.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 50000,
        })

        collector.on('collect', async (menu) => {
            if (menu.values[0] === 'Option 1') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 128px').setImage(target.user.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 0') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 1024px').setImage(target.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 2') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 256px').setImage(target.user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
                    ]
                })
            }
        })

        collector.on('end', async (menu) => {
            avt.edit({ components: [] });
        })
    }
}