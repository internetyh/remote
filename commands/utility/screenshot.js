const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const screenshot = require('screenshot-desktop');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('screenshot')
		.setDescription('see your current pc screen'),
	async execute(interaction) {
        screenshot().then(img => {
            fs.writeFile('screenshot.png', img, (err) => {
                if (err) throw err;
                interaction.reply('Desktop: ');
                return interaction.channel.send({files: ['screenshot.png']});
            });
        }).catch((err) => {
            console.log(err);
        })

	},
};
