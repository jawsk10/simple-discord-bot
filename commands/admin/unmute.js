const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to unmute')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = interaction.options.getMember('target');

        try {
            await target.timeout(null);
            await interaction.reply(`🔊 Successfully unmuted ${target.user.tag}`);
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to unmute the user!', 
                ephemeral: true 
            });
        }
    },
};