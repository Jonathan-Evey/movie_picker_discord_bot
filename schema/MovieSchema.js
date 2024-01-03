const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const MovieSchema = new Schema({
  movie_title: String,
  user_id: { type: Number, ref: "UserID" },
  server_id: { type: Number, ref: "ServerID" },
});
