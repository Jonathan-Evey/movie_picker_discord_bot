const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const MovieSchema = require("../../schema/MovieSchema.js");

mongoose.set("strictQuery", false);

const checkForMovie = async (db, movieTitle) => {
  let movieFound = await db.findOne({ movie_title: movieTitle });
  console.log(movieFound);
  if (movieFound) {
    return true;
  } else {
    return false;
  }
};

const saveMovie = async (db, movieTitle, userId, serverId) => {
  const newMovie = new db({
    movie_title: movieTitle,
    user_id: userId,
    server_id: serverId,
  });
  await newMovie.save();
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds a movie to the list")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Add your movie title here")
        .setRequired(true)
    ),
  async execute(interaction) {
    mongoose.models = {};
    let MovieList = mongoose.model("Movie", MovieSchema);
    //console.log(interaction);
    let serverId = interaction.member.guild.id;
    //console.log(serverId);
    let userId = interaction.user.id;
    //console.log(userId);
    let movieTitle = interaction.options.get("title");
    //console.log(movieTitle);
    let isMovie = await checkForMovie(MovieList, movieTitle.value);
    if (isMovie) {
      interaction.reply({
        content: `${movieTitle.value} is already added!`,
        ephemeral: true,
      });
    } else {
      await saveMovie(MovieList, movieTitle.value, userId, serverId);
      interaction.reply({
        content: `${movieTitle.value} added!`,
        ephemeral: true,
      });
    }
  },
};
