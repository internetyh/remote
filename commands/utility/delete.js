const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
var { BOT_DIR } = require('./defaults.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('delete a non-core command')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('command to delete')
                .setRequired(true)),
	async execute(interaction) {
        const command = interaction.options.getString('command', true).toLowerCase();
        const banned_commands = ['add_fav', 'deploy', 'delete', 'reload', 'run', 'screenshot', 'restart'];
        
        if (banned_commands.includes(command)) {
            await interaction.reply(`Can not delete core command ${command}`);
            return;
        }
        
        try {
            fs.unlinkSync(`${BOT_DIR}/commands/utility/${command}.js`);
            await interaction.reply(`Deleted ${command}`);
        } catch(error) {
            await interaction.reply(`${error}`);
        }
        
	},
};
