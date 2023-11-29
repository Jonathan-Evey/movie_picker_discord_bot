const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds a movie to the list")
    .addStringOption((option) =>
      option.setName("input").setDescription("Add your movie title here")
    ),
  async execute(interaction) {
    await interaction.reply("Movie added!").then(console.log(interaction));
  },
};
