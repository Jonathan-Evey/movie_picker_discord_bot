const { SlashCommandBuilder } = require("discord.js");

let selectedMovie = "Movie Title Here";
let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a movie from the server's movie list"),
  async execute(interaction) {
    await interaction.reply("Making movie selection...");
    await wait(2000);
    await interaction.editReply(selectedMovie);
  },
};
