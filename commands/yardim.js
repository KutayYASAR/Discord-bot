const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
    name: 'yardim',
    description: 'Komutları listeler ve hakkında bilgi verir.',
    usage: '<Komut Adı>',
    execute(message, args) {
        const { commands } = message.client;
        const helpEmbed = new Discord.MessageEmbed().setColor('#0099ff');

        if (!args.length) {
            helpEmbed.setTitle('Komutlarımın listesi');
            commands.map(command => command.name);
            commands.forEach(element => {
                helpEmbed.addField(element.name.toUpperCase(), '* - * - * - *');
            });
            // helpEmbed.addFields(commands.map(command => command.name).join(',\n'));
            helpEmbed.addField(`\n\`${prefix}${module.exports.name} <Komut Adı>\` yazarak komutlar hakkında detaylı bilgi alabilirsiniz.`);

            return message.author.send(helpEmbed)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Size tüm komutlarımı Özel Mesaj ile gönderdim.');
            })
            .catch(error => {
                console.error(`${message.author.tag}'a Özel Mesaj gönderemedim.\n`, error);
            });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name);
        const helpEmbed2 = new Discord.MessageEmbed().setColor('#0099ff');
        if (!command) {
            return message.reply('Geçerli bir komut girmediniz.');
        }
        helpEmbed2.setTitle(`${command.name}`);
        if (command.description) helpEmbed2.addField('- Açıklaması:', `${command.description}`);
        if (command.usage) helpEmbed2.addField('- Kullanımı:', `${prefix}${command.name} ${command.usage}`);
        message.channel.send(helpEmbed2);
    },
};