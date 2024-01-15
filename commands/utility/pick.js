const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { pickMovie } = require("../models/movieModule.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a movie from the server's movie list"),
  async execute(interaction) {
    const yesButton = new ButtonBuilder()
      .setCustomId("yesButton")
      .setLabel("Yes")
      .setStyle(ButtonStyle.Success);
    const noButton = new ButtonBuilder()
      .setCustomId("noButton")
      .setLabel("No")
      .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(yesButton, noButton);
    console.log(row);
    let selectedMovie = await pickMovie();
    await interaction.reply({
      content: `${selectedMovie}\nAre you going to watch this movie?`,
      components: [row],
    });
    // await interaction.update({

    // })
  },
};
