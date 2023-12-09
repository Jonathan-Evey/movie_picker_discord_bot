const { SlashCommandBuilder } = require("discord.js");

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
    let serverId = interaction.member.guild.id;
    console.log(serverId);
    let userId = interaction.user.id;
    console.log(userId);
    let movieTitle = interaction.options.get("title");
    console.log(movieTitle);
    await interaction.reply({
      content: `${movieTitle.value} added!`,
      ephemeral: true,
    });
  },
};
