const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'profil') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Profil Resminiz: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`, { files: [message.author.avatarURL()] });
		}
		else if(message.mentions.users.size === 1) {
			return message.channel.send(`${message.mentions.users.first().username}'in Profil Resmi: <${message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true })}>`, { files: [message.mentions.users.first().avatarURL()] });
		}
		else {
			return message.channel.send('Lütfen tek seferde sadece 1 adet etiketleme yapınız!');
		}
	}
	else if (command === 'temizle') {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply('Lütfen geçerli bir sayı giriniz!');
		}
		else if(amount < 2 || amount > 100) {
			return message.reply('En az 1 en fazla 99 mesaj silebilirsiniz');
		}
		if (message.channel.bulkDelete(amount, true).catch(err => {
			console.log(err);
			message.channel.send('Temizleme işlemi bir hatadan dolayı yapılamadı!');
		})) {
			message.reply(`${amount - 1} adet mesaj başarıyla silindi!`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error));
		}
	}
	else if (command === 'server') {
		const date = message.guild.createdAt.toLocaleString();
		console.log(date);
		return message.channel.send(`Merhaba ${message.author.name}!\nSunucumuz : ${message.guild.name}\n ${date}'dan beri açık! \nÜye Sayımız : ${message.guild.memberCount}\n`, { files: [message.guild.iconURL()] });
	}
});
client.login(token);