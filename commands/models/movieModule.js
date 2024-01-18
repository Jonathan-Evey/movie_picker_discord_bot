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
	let movieList = await Movies.find({ watched: false });
	console.log(movieList);
	if (movieList.length > 0) {
		let pickIndexNumber = Math.floor(Math.random() * movieList.length);
		selectedMovie = movieList[pickIndexNumber].toObject();
		//selectedMovie.watched = true;
		movieTitle = selectedMovie["movie_title"];
		movieAddedBy = selectedMovie["user_name"];
		return {
			title: movieTitle,
			addedBy: movieAddedBy,
		};
	} else {
		return false;
	}
};

const updateMovieToWatched = async (title) => {
	const movie = await Movies.findOne({ movie_title: title });
	movie.watched = true;
	await movie.save();
};

/// ---- list function
const findUserMovieList = async (id) => {
	let moviesFound = await Movies.find({ user_id: id });
	if (moviesFound) {
		let movieArray = [];
		let watchedMovieArray = [];
		moviesFound.forEach((movie) => {
			if (movie.toObject().watched === false) {
				movieArray.push(movie.toObject()["movie_title"]);
			} else {
				watchedMovieArray.push(movie.toObject()["movie_title"]);
			}
		});
		if (movieArray.length === 0) {
			return `You have no movies added on the server list. Use /add to add a movie.\n\nMovies you added to the list that have been watched by the server:\n${watchedMovieArray.join(
				"\n"
			)}`;
		}
		if (watchedMovieArray.length === 0) {
			return `Movies you have on the server list:\n${movieArray.join("\n")}`;
		}
		return `Movies you have on the server list:\n${movieArray.join(
			"\n"
		)}\nMovies you added to the list that have been watched by the server:\n${watchedMovieArray.join(
			"\n"
		)}`;
	} else {
		return "You have no movies added on the server list.";
	}
};

/// --- watched function
const watchedList = async () => {
	let moviesWatched = await Movies.find({ watched: true });
	if (moviesWatched) {
		let movieArray = [];
		let numberTitleArray = [];
		let letterTitleArray = [];
		moviesWatched.forEach((movie) => {
			movieArray.push(movie.toObject());
		});
		movieArray.sort((a, b) => {
			return a.movie_title > b.movie_title ? 1 : -1;
		});
		movieArray.forEach((movie) => {
			if (movie.movie_title[0].match(/[0-9]/)) {
				numberTitleArray.push(movie);
			} else {
				letterTitleArray.push(movie);
			}
		});
		let finalArray = [...letterTitleArray, ...numberTitleArray];
		let movieList = "";
		finalArray.forEach((movie) => {
			movieList =
				movieList + `${movie.movie_title} - added by ${movie.user_name}\n`;
		});
		if (finalArray.length > 1) {
			return `This server has watched ${finalArray.length} movies\n${movieList}`;
		} else {
			return `This server has watched ${finalArray.length} movie\n${movieList}`;
		}
	} else {
		("This server has yet to watch a movie on the list.");
	}
};

module.exports = {
	saveMovie,
	checkForMovie,
	pickMovie,
	updateMovieToWatched,
	findUserMovieList,
	watchedList,
};
