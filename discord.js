const { Client, GatewayIntentBits, ActivityType, Collection } = require("discord.js");
const env = require('./env.json');
const fs = require("fs");
const path = require("path");





const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
})






client.on('ready', () => {
  client.user.setActivity("ALPHA Developing",{type: ActivityType.Playing});
  client.user.setStatus('idle');
  console.log(`Logged in as ${client.user.tag}!`);

});

  client.commands = new Collection();
  const commandpath = path.join(__dirname,'Commands','command');
  const commandfiles = fs.readdirSync(commandpath).filter(f=>f.endsWith('js'));
  for(file of commandfiles){
    const filepath = path.join(commandpath,file);
    console.log(filepath);
    const command = require(filepath);
    client.commands.set(command.data.name,command);
  }

client.on('interactionCreate',async interactin=>{
  if(!interactin.isChatInputCommand()) return;

  const command = interactin.client.commands.get(interactin.commandName);

  if(!command) return;

  try{
    await command.execute(interactin)
  }catch(error){
    console.error(error);
    await interactin.reply({content:'發生一些錯誤請回報',ephemeral:true});
  }

})

client.login(env.token);