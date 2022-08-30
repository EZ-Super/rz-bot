const { PermissionFlagsBits , SlashCommandBuilder, REST, Routes } = require('discord.js');
const env = require('./env.json');

const guildcommands = []

const commands = []

const rest = new REST ({version : '10'}).setToken(env.token);

(async () => {
  try {
    console.log('開始註冊指令');

    await rest.put(Routes.applicationCommands(env.client_id), { body: commands });
    await rest.put(Routes.applicationGuildCommands(env.client_id,env.main_guild),{body : guildcommands});

    console.log('指令註冊完畢');
  } catch (error) {
    console.error(error);
  }
})();