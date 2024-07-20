const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
var { DEFAULT_DIR } = require('./defaults.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add_fav')
		.setDescription('create a new favourite command')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('command to favourite')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of the command')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('args')
                .setDescription('Name any args')
                .setRequired(false)),

	async execute(interaction) {
        const command = interaction.options.getString('command', true).toLowerCase();
        const name = interaction.options.getString('name', true).toLowerCase();
        
        try {
            var args = interaction.options.getString('args', false);
            var arg_count = 0;
            if (args != null) {
                args = args.toLowerCase();
                args = args.split(',');
                arg_count = args.length;
            }

            var part1 = fs.readFileSync('./command_layout/part1.txt', 'utf8');
            part1 = part1.replaceAll('<name>', name);
            
            for (let i = 0; i < arg_count; i++) {
                var part2 = fs.readFileSync('./command_layout/part2.txt', 'utf8');
                part2 = part2.replaceAll('<arg>', args[i]);
                part1 += `\n\t${part2}`;
            }
            part1 += ',';

            var part3 = fs.readFileSync('./command_layout/part3.txt', 'utf8');
            part1 += `\n\t${part3}`

            for (let i = 0; i < arg_count; i++) {
                var part4 = fs.readFileSync('./command_layout/part4.txt', 'utf8');
                part4 = part4.replaceAll('<arg>', args[i]);
                part1 += `\n\t\t${part4}`;
            }
            
            var part5 = fs.readFileSync('./command_layout/part5.txt', 'utf8');
            part5 = part5.replaceAll('<command>', command);
            part5 = part5.replaceAll('\\', '\\\\');
            part1 += `\n${part5}`

            console.log(part1);

            fs.writeFileSync(`./commands/utility/${name}.js`, part1);

        } catch(error) {
            interaction.reply(`${error}`);
        }
        

	},
};
