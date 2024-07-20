const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command to reload')
                .setRequired(true)),
    
    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            await interaction.reply(`There is no command with name ${commandName}`);
            return;
        }

        delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
            const newCommand = require(`./${command.data.name}.js`);
            await interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command ${newCommand.data.name} reloaded`);
        } catch(error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading command ${command.data.name} ${error.message}`);
        }

    },
};