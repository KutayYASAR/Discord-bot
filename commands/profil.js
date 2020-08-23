module.exports = {
    name: 'profil',
    description: 'Kişinin avaratını verir.',
    usage: '<Kişinin Etiketi>',
    execute(message) {
        if (!message.mentions.users.size) {
			return message.channel.send(`Profil Resminiz: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`, { files: [message.author.avatarURL()] });
		}
		else if(message.mentions.users.size === 1) {
			return message.channel.send(`${message.mentions.users.first().username}'in Profil Resmi: <${message.mentions.users.first().displayAvatarURL({ format: 'png', dynamic: true })}>`, { files: [message.mentions.users.first().avatarURL()] });
		}
		else {
			return message.channel.send('Lütfen tek seferde sadece 1 adet etiketleme yapınız!');
		}
    },
};