const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const { pickMovie, updateMovieToWatched } = require("../models/movieModule.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pick")
		.setDescription("Pick a movie from the server's movie list"),
	async execute(interaction) {
		const yesButton = new ButtonBuilder()
			.setCustomId("yesButton")
			.setLabel("Yes")
			.setStyle(ButtonStyle.Success);
		const noButton = new ButtonBuilder()
			.setCustomId("noButton")
			.setLabel("No")
			.setStyle(ButtonStyle.Secondary);
		const row = new ActionRowBuilder().addComponents(yesButton, noButton);
		let selectedMovie = await pickMovie();
		if (selectedMovie === false) {
			await interaction.reply({
				content:
					"There are no movies to pick on the list. To add a movie please use the /add command.",
			});
		} else {
			const response = await interaction.reply({
				content: `"${selectedMovie.title}" - added by ${selectedMovie.addedBy}\nAre you going to watch this movie?`,
				components: [row],
			});

			try {
				const confirmation = await response.awaitMessageComponent({
					time: 60_000,
				});
				if (confirmation.customId === "yesButton") {
					await updateMovieToWatched(selectedMovie.title);
					await interaction.editReply({
						content: `${selectedMovie.title} has been added to the watched list, enjoy your movie!`,
						components: [],
					});
				} else if (confirmation.customId === "noButton") {
					await interaction.editReply({
						content:
							"Movie has been put back on the list, please us /pick to pick a new movie.",
						components: [],
					});
				}
			} catch (error) {
				await interaction.editReply({
					content:
						"Confirmation not received within 5 minutes, please call /pick again to pick a new movie.",
					components: [],
				});
			}
		}
	},
};
