const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8ball a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question for the 8ball')
                .setRequired(true)),
    async execute(interaction) {
        const responses = [
            'It is certain.',
            'Without a doubt.',
            'You may rely on it.',
            'Yes definitely.',
            'Ask again later.',
            'Cannot predict now.',
            'Don\'t count on it.',
            'My sources say no.',
            'Very doubtful.'
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`🎱 ${response}`);
    },
};