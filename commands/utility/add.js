const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds a movie to the list")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Add your movie title here")
        .setRequired(true)
    ),
  async execute(interaction) {
    console.log("send data");
    await interaction.reply({ content: "Movie added!", ephemeral: true });
  },
};
