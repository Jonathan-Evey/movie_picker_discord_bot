const Movies = require("../schemas/Movie");

/// ---- add function
const saveMovie = async (movieTitle, userId, userName, serverId) => {
  const newMovie = new Movies({
    movie_title: movieTitle,
    user_id: userId,
    user_name: userName,
    server_id: serverId,
  });
  await newMovie.save();
};
/// ---- add function
const checkForMovie = async (movieTitle) => {
  let movieFound = await Movies.findOne({ movie_title: movieTitle });
  if (movieFound) {
    return true;
  } else {
    return false;
  }
};
/// ---- pick function
const pickMovie = async () => {
  let movieList = await Movies.find({});
  if (movieList) {
    let pickIndexNumber = Math.floor(Math.random() * movieList.length);
    selectedMovie = movieList[pickIndexNumber].toObject()["movie_title"];
    movieAddedBy = movieList[pickIndexNumber].toObject()["user_name"];
    return `${selectedMovie}\nMovie was added by ${movieAddedBy}`;
  }
};

/// ---- list function
const findUserMovieList = async (id) => {
  let moviesFound = await Movies.find({ user_id: id });
  if (moviesFound) {
    let movieList = "";
    moviesFound.forEach((movie) => {
      movieList = movieList + `${movie.toObject()["movie_title"]}\n`;
    });
    return movieList;
  } else {
    return "You have no movies added on the server list.";
  }
};

/// --- watched function
const watchedList = async () => {
  let moviesWatched = await Movies.find({ watched: true });
  if (moviesWatched) {
    let movieCount = 0;
    let movieList = "";
    moviesWatched.forEach((movie) => {
      movieList = movieList + `${movie.toObject()["movie_title"]}\n`;
      movieCount = movieCount + 1;
    });
    return `This server has watched ${movieCount} movies\n${movieList}`;
  } else {
    ("This server has yet to watch a movie on the list.");
  }
};

module.exports = {
  saveMovie,
  checkForMovie,
  pickMovie,
  findUserMovieList,
  watchedList,
};
