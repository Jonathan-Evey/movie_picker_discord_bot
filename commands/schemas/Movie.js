const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  movie_title: String,
  user_id: { type: Number, ref: "UserID" },
  user_name: String,
  server_id: { type: Number, ref: "ServerID" },
});

module.exports = mongoose.model("Movie", MovieSchema);
