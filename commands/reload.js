module.exports = {
    name:'reload',
    description:'Verilen komutu yeniden yükler.',
    execute(message, args) {
        if (!args.length) return message.channel.send(`Yenilenecek bir komut girmediniz, ${message.author}!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);
        if (!command) return message.channel.send(`Bu isimde bir komut yok \`${commandName}\`, ${message.author}!`);
        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } 
        catch (error) {
            console.log(error);
            message.channel.send(`Komutu yüklerken bir hata oluştu \`${command.name}\`:\n\`${error.message}\``);
        }
        message.channel.send(`\`${command.name}\` Komutu yeniden yüklendi.`);
    },
};
