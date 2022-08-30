const {SlashCommandBuilder,EmbedBuilder,CommandInteractionOptionResolver} = require('discord.js');
const wait = require('timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
    .setName('not')
    .setDescription('若無顯示其他指令請在此用此指令查詢')
    .addSubcommand(sub=>sub
        .setName('allow')
        .setDescription('不允許原因查詢')
        .addStringOption(op=>op
            .setName('report')
            .setDescription('回報問題')    
            .setRequired(true)
        )
    
    ),
    
    async execute(interaction){
        try{
            await interaction.reply('問題查詢中請稍後....');
            await wait(2000);
            const notallow = new EmbedBuilder()
                .setColor(0x009FF)
                .setTitle('檢查報告')
                .setDescription(`該伺服器沒有使用該機器人指令的權限\n${interaction.user.tag}你好目前處於開發階段暫不開放所有指令使用\n你回報的原因${interaction.options.getString('report')} `)

            interaction.deleteReply();
            interaction.channel.send({embeds:[notallow]});
        }catch(error){
            console.error(error);
        } 
    }
}