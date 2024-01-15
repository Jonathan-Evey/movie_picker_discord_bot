const { SlashCommandBuilder } = require("discord.js");
const { saveMovie, checkForMovie } = require("../models/movieModule.js");

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
		console.log(interaction);
		let movieTitle = interaction.options.get("title");
		let userId = interaction.user.id;
		let userName;
		console.log(interaction.member.nickname);
		if (interaction.member.nickname) {
			userName = interaction.member.nickname;
		} else if (interaction.user.globalName) {
			userName = interaction.user.globalName;
		} else {
			userName = "Display name not set up";
		}

		let serverId = interaction.member.guild.id;

		let isMovie = await checkForMovie(movieTitle.value);
		if (isMovie) {
			interaction.reply({
				content: `${movieTitle.value} is already added!`,
				ephemeral: true,
			});
		} else {
			await saveMovie(movieTitle.value, userId, userName, serverId);
			interaction.reply({
				content: `${movieTitle.value} added!`,
				ephemeral: true,
			});
		}
	},
};
