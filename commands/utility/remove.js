const {
	SlashCommandBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
} = require("discord.js");
const { userMoviesOnList, removeMovie } = require("../models/movieModule.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("remove")
		.setDescription("Your movies on the list"),
	async execute(interaction) {
		let userId = interaction.user.id;
		let userMovies = await userMoviesOnList(userId);
		if (userMovies.length > 0) {
			const menuOptionsArray = [];
			userMovies.forEach((movie) => {
				let movieOption = new StringSelectMenuOptionBuilder()
					.setLabel(movie.movie_title)
					.setDescription("Select to remove")
					.setValue(movie.movie_title);
				menuOptionsArray.push(movieOption);
			});
			let cancelOption = new StringSelectMenuOptionBuilder()
				.setLabel("Cancel")
				.setDescription("Cancel /remove command")
				.setValue("Cancel /remove");

			menuOptionsArray.push(cancelOption);
			const selectionMenu = new StringSelectMenuBuilder()
				.setCustomId("removeMovie")
				.setPlaceholder("Select movie you want to remove")
				.addOptions(menuOptionsArray);

			const row = new ActionRowBuilder().addComponents(selectionMenu);

			const response = await interaction.reply({
				content: "Select movie to remove.",
				components: [row],
				ephemeral: true,
			});
			try {
				const confirmation = await response.awaitMessageComponent({
					time: 300_000,
				});
				if (confirmation) {
					if (confirmation.values[0] === "Cancel /remove") {
						await interaction.editReply({
							content: `/remove has been cancelled`,
							components: [],
						});
					} else {
						let userId = confirmation.user.id;
						let movieTitle = confirmation.values[0];
						await removeMovie(userId, movieTitle);
						await interaction.editReply({
							content: `${movieTitle} has been removed from the servers list of movies.`,
							components: [],
						});
					}
				}
			} catch (error) {
				await interaction.editReply({
					content:
						"Confirmation was not received within 5 minutes, please use /remove again to remove a movie.",
					components: [],
				});
			}
		} else {
			await interaction.reply({
				content:
					"You have no movies on the server list. To add a movie please use the /add command.",
				ephemeral: true,
			});
		}
	},
};
