const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const fs = require('node:fs');
const path = require('node:path');
const maxMsgLength = 2000;
var { DEFAULT_DIR } = require('./defaults.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('run')
		.setDescription('run a command script')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('run a command')
                .setRequired(true)),
	async execute(interaction) {
        const command = interaction.options.getString('command', true).toLowerCase();

        if (command.startsWith('upload')) {
            const target = command.substring(7).trim();
            const absPath = path.resolve(DEFAULT_DIR, target);

            if (fs.lstatSync(absPath).isFile()) {
                await interaction.reply('Uploading file:');
                await interaction.channel.send({files: [absPath]});
                return;
            }
            else {
                await interaction.reply(`${absPath} is not valid`);
                return;
            }

        }

        exec(command, { cwd: DEFAULT_DIR }, (error, stdout, stderr) => {
            if (error) {
                return interaction.reply(`Error: ${error.message}`);
            }
            if (stderr) {
                return interaction.reply(`Stderr: ${stderr}`)
            }

            if (command.startsWith('cd')) {
                const path = command.substring(3);
                if (fs.existsSync(path)) {
                    DEFAULT_DIR = path;
                    return interaction.reply(`Directory changed to ${DEFAULT_DIR}`);
                }
                else{
                    return interaction.reply(`${command} is not a valid directory`);
                }
                
            }
            
            if (stdout.length > maxMsgLength) {
                fs.writeFile('too_long.txt', stdout, err => {if (err) { console.log(err); } else { }});
                interaction.reply('Too long, Uploading a file:');
                return interaction.channel.send({files: ['too_long.txt']});
            }
            else{
                return interaction.reply(`Output: ${stdout}`)
            }
        })
	},
};
