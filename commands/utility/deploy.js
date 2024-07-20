const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
var { BOT_DIR } = require('./defaults.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('deploy')
		.setDescription('deploy commands'),
	async execute(interaction) {
        exec(`node "${BOT_DIR}/deploy-commands.js"`, 
            (error, stout, stderr) => {
                if (error) {
                    return interaction.reply(`Error: ${error.message}`);
                }
                if (stderr) {
                    return interaction.reply(`Stderr: ${stderr}`)
                }
                return interaction.reply(`Output: ${stout}`);
        })
	},
};
