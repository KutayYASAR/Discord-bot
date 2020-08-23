module.exports = {
	name: 'temizle',
    description:'Toplu mesaj temizleme',
    args: true,
    guildOnly: true,
    usage: '<Mesaj Sayısı>',
    execute(message, args) {
            const amount = parseInt(args[0]) + 1;

            if(amount < 2 || amount > 100) {
                return message.reply('En az 1 en fazla 99 mesaj silebilirsiniz');
            }
            if (message.channel.bulkDelete(amount, true).catch(err => {
			console.log(err);
                message.channel.send('Temizleme işlemi bir hatadan dolayı yapılamadı!');
		})) {
                message.reply(`${amount - 1} adet mesaj başarıyla silindi!`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error));
            }
        },
    };
