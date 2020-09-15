const fs = require('fs');
const Discord = require('discord.js');
const Canvas = require('canvas');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 64;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'hosgeldiniz');
	if (!channel) return;

	const canvas = Canvas.createCanvas(600, 300);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#FA6A00';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	
	ctx.font = '42px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Hoşgeldin!', canvas.width / 2.5, canvas.height / 2.5);

	ctx.font = applyText(canvas, member.displayName);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.75);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.guild.name}`, canvas.width / 2.5, canvas.height / 1.40);

		ctx.beginPath();
		ctx.arc(150, 150, 75, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
	
	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 75, 75, 150, 150);
	ctx.strokeStyle = '#FFFFFF';
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.arc(150, 150, 75, 0, Math.PI * 2, true);
	ctx.stroke();
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Sunucuya Hoşgeldin, ${member}!`, attachment);
});
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Bu komutu Özel Mesaj üzerinden gerçekleştiremem.');
	}

	if (command.args && !args.length) {
		let reply = `Lütfen argüman belirtin, ${message.author}`;
		if (command.usage) {
			reply += `\n Doğru kullanım şu şekilde: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.log(error);
		message.reply('Komutu çalıştırırken bir hata oluştu!');
	}
});
client.login(token);