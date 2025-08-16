const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user for a specified duration')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Mute duration (e.g., 1h, 30m)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for muting'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const durationMs = parseDuration(duration);
        if (!durationMs) {
            return interaction.reply({ 
                content: 'Invalid duration format! Use format like 1h, 30m, 1d', 
                ephemeral: true 
            });
        }

        try {
            await target.timeout(durationMs, reason);
            await interaction.reply(`🔇 Successfully muted ${target.user.tag} for ${duration} | Reason: ${reason}`);
        } catch (error) {
            await interaction.reply({ 
                content: 'Failed to mute the user!', 
                ephemeral: true 
            });
        }
    },
};

function parseDuration(duration) {
    const match = duration.match(/^(\d+)([hmd])$/);
    if (!match) return null;

    const [, amount, unit] = match;
    const multipliers = {
        'm': 60 * 1000,
        'h': 60 * 60 * 1000,
        'd': 24 * 60 * 60 * 1000
    };

    return amount * multipliers[unit];
}