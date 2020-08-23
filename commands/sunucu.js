module.exports = {
    name: 'sunucu',
    description:'Sunucu bilgileri',
    guildOnly: true,
    execute(message) {
        const date = message.guild.createdAt.toLocaleString();
		return message.reply(`Merhaba!\nSunucumuz : ${message.guild.name}\n ${date}'den beri açık! \nÜye Sayımız : ${message.guild.memberCount}\n`, { files: [message.guild.iconURL()] });
    },
};