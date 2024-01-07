const { SlashCommandBuilder } = require("discord.js");
const { findUserMovieList } = require("../models/movieModule.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription(
      "Shows only you the list of movies that you have added to the server movie list."
    ),
  async execute(interaction) {
    let userId = interaction.user.id;
    await interaction.reply({
      content: `Making movie selection...`,
      ephemeral: true,
    });
    let userList = await findUserMovieList(Number(userId));
    await interaction.editReply(userList);
  },
};
