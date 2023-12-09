const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movie_title: String,
  added_by_user_id: { type: Number, ref: "UserID" },
  server_id: { type: Number, ref: "ServerID" },
});

// const UserListInstanceSchema

// const ServerListInstanceSchema

export default MovieSchema;
