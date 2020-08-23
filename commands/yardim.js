const { prefix } = require('../config.json');
module.exports = {
    name: 'yardım',
    description: 'Komutları listeler ve hakkında bilgi verir.',
    usage: '<Komut Adı>',
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Komutlarımın listesi:\n');
            data.push(commands.map(command => command.name).join(',\n'));
            data.push(`\n\`${prefix}yardım <Komut Adı>\` yazarak komutlar hakkında detaylı bilgi alabilirsiniz.`);

            return message.author.send(data, { split : true })
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
        if (!command) {
            return message.reply('Geçerli bir komut girmediniz.');
        }
        data.push(`- Komut ismi:  ${command.name}`);
        if (command.description) data.push(`- Açıklaması:  ${command.description}`);
        if (command.usage) data.push(`- Kullanımı:  ${prefix}${command.name} ${command.usage}`);
        message.channel.send(data, { split: true });
    },
};