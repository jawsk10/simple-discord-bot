const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Display information about a user')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to get info about')),
    async execute(interaction) {
        const target = interaction.options.getUser('target') ?? interaction.user;
        const member = interaction.guild.members.cache.get(target.id);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${target.username}'s Information`)
            .addFields(
                { name: 'Joined Discord', value: `${target.createdAt.toDateString()}`, inline: true },
                { name: 'Joined Server', value: `${member.joinedAt.toDateString()}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(r => r).join(', ')}` }
            )
            .setThumbnail(target.displayAvatarURL());
        
        await interaction.reply({ embeds: [embed] });
    },
};