const Discord = require('discord.js');

module.exports = {
    name: 'sunucu',
    description:'Sunucu bilgileri',
    guildOnly: true,
    execute(message) {
        const date = message.guild.createdAt.toLocaleString();
        const serverEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(message.guild.name)
        .setDescription('Suncumuza Hoşgeldiniz')
        .setURL(message.guild.url)
        .setThumbnail(message.guild.iconURL())
        .addFields(
            { name :'Üye Sayımız', value: message.guild.memberCount },
            { name :'Kuruluş Tarihi', value: date },
        );
        return message.channel.send(serverEmbed);
        // return message.reply(`Merhaba!\nSunucumuz : ${message.guild.name}\n ${date}'den beri açık! \nÜye Sayımız : ${message.guild.memberCount}\n`, { files: [message.guild.iconURL()] });
    },
};