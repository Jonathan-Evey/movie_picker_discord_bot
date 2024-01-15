const { SlashCommandBuilder } = require("discord.js");
const { watchedList } = require("../models/movieModule.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("watched")
    .setDescription("Show list of watched movies."),
  async execute(interaction) {
    await interaction.reply({
      content: `Finding list of watched movies...`,
    });
    let moviesWatched = await watchedList();
    await interaction.editReply(moviesWatched);
  },
};
