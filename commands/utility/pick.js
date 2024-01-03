const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const MovieSchema = require("../../schema/MovieSchema.js");

let selectedMovie = "Movie Title Here";

const pickMovie = async (db) => {
  let movieList = await db.find({});
  if (movieList) {
    let pickIndexNumber = Math.floor(Math.random() * movieList.length);
    selectedMovie = movieList[pickIndexNumber].toObject()["movie_title"];
  }
};
let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a movie from the server's movie list"),
  async execute(interaction) {
    mongoose.models = {};
    let MovieList = mongoose.model("Movie", MovieSchema);
    await interaction.reply({
      content: `Making movie selection...`,
    });
    await pickMovie(MovieList);
    await interaction.editReply(selectedMovie);
  },
};
