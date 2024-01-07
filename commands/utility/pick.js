const { SlashCommandBuilder } = require("discord.js");
const { pickMovie } = require("../models/movieModule.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a movie from the server's movie list"),
  async execute(interaction) {
    await interaction.reply({
      content: `Making movie selection...`,
    });
    let selectedMovie = await pickMovie();
    await interaction.editReply(selectedMovie);
  },
};
