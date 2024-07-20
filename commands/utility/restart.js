const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const { BOT_DIR } = require('./defaults.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('restart the bot'),
    async execute(interaction) {

        interaction.reply('Restarting')

        exec(`pm2 restart bot`, (error, stdout, stderr) => {})

    },
};
