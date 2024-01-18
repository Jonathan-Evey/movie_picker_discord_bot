const { SlashCommandBuilder } = require("discord.js");
const { saveMovie, checkForMovie } = require("../models/movieModule.js");
const { formatTitle } = require("./formatTitle");

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
		let movieTitle = interaction.options.get("title");
		let titleFormatted = formatTitle(movieTitle.value);
		let isMovie = await checkForMovie(titleFormatted);
		if (isMovie) {
			interaction.reply({
				content: `${titleFormatted} is already added!`,
				ephemeral: true,
			});
		} else {
			let userId = interaction.user.id;
			let userName;
			if (interaction.member.nickname) {
				userName = interaction.member.nickname;
			} else if (interaction.user.globalName) {
				userName = interaction.user.globalName;
			} else {
				userName = "Display name not set up";
			}

			let serverId = interaction.member.guild.id;

			await saveMovie(titleFormatted, userId, userName, serverId);
			interaction.reply({
				content: `${titleFormatted} added!`,
				ephemeral: true,
			});
		}
	},
};
